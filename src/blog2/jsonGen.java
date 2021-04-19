package blog2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


public class jsonGen {
	static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	
	public static void genJson(File root) throws Exception{
		JSONArray currnetJa = new JSONArray();
		Map<Long, String> articles = new HashMap<Long, String>();
		for(File f:root.listFiles()) {
			
			if(f.isDirectory()) {
				if(f.getName().contains("_files")||f.getName().equals("src")||f.getName().equals("bin")||f.getName().equals(".git")) {
					continue;
				}
				genJson(f);
			}else {
				//应当只对文章进行索引
				if(f.getName().contains(".html")&&!f.getName().contains("json")&&!f.getName().contains("index")) {
					if(articles.get(f.lastModified())==null) {
						articles.put(f.lastModified(), f.getName());
					}else {
						//让修改日期小幅摆动，避免相同修改时间的文件无法同时存在
						articles.put(f.lastModified() + (int)(1000*(Math.random()-0.5)), f.getName());
					}
				}
			}
			
		}
		//System.out.println(articles);
		Set<Long> sortedSet = new TreeSet<Long>(new Comparator<Long>() {
			public int compare(Long o1,Long o2) {
				return o2.compareTo(o1);
			}
		});
		sortedSet.addAll(articles.keySet());
		for(Long id :sortedSet) {
			//System.out.println(articles.get(id));
			JSONObject jObject = new JSONObject();
			jObject.put("name", articles.get(id));
			jObject.put("date", sdf.format(id));
			currnetJa.add(jObject);
		}
		//System.out.println("------------------------------");
		JSONObject cjo = new JSONObject();
		cjo.put("article", currnetJa);
		FileOutputStream fos = new FileOutputStream(new File(root.getAbsolutePath() + "/json_utf8"));
		fos.write(cjo.toString().getBytes("utf-8"));
		fos.close();
	}
	
	
	
	public static void resumeDate(File root) throws Exception {
		//恢复所有文章的修改日期
		//先找到索引文件
		System.out.println("Resume for: " + root + " ...");
		String root_path = root.getAbsolutePath();
		File indexFile = new File(root_path + "/json_utf8");
		//如果不存在，直接返回
		if(!indexFile.exists()) return;
		//读取文件并转换为Json数组
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(indexFile)));
		StringBuilder sb = new StringBuilder();
		String str;
		while((str = br.readLine())!=null) {
			sb.append(str);
		}
		br.close();
		JSONArray articles = JSONObject.parseObject(sb.toString()).getJSONArray("article");
		System.out.println(root_path + ": ");
		System.out.println(articles);
		//遍历索引
		for(int i=0;i<articles.size();i++) {
			JSONObject article = articles.getJSONObject(i);
			//找到需要修改时间的文件
			File current_article = new File(root_path + "/" + article.getString("name"));
			//修改时间
			if(current_article.exists()) {
				current_article.setLastModified(sdf.parse(article.getString("date")).getTime());
			}
		}
		//递归处理子目录
		for(File f:root.listFiles()) {
			//只处理目录
			if(!f.isDirectory()) continue;
			//忽略特殊路径
			if(f.getName().contains("_files")||f.getName().equals("src")||f.getName().equals("bin")||f.getName().equals(".git")) continue;
			resumeDate(f);
		}
	}
	
	public static void main(String[] args) throws Exception {
		// TODO 自动生成的方法存根
		File root = new File("");
		root = new File(root.getAbsolutePath());
		if(args.length>0 && args[0].equals("resume")) {
			resumeDate(root);			
		}else {
			File indexFile = new File(root.getAbsolutePath() + "/json_utf8");
			File gitIgnore= new File(root.getAbsolutePath() + "/.gitignore");
			//如果git仓库不存在，阻止运行
			if(!gitIgnore.exists()) {
				System.out.println("gitignore 文件未找到，为保证索引文件不被破坏，此命令无法执行！");
				System.exit(-1);
			}
			//如果索引文件和 .git 仓库的修改日期相差小于1小时，说明仓库是刚刚克隆下来的，不能执行生成命令
			//System.out.println(Math.abs(indexFile.lastModified()-gitIgnore.lastModified()));
			if(indexFile.exists()&&Math.abs(indexFile.lastModified()-gitIgnore.lastModified())<3600_000) {
				System.out.println("仓库可能是刚刚克隆下来的，转为执行 resume命令恢复文件的修改日期，如果要重建索引，请在仓库克隆完成1小时后执行 touch json_utf8 命令");
				resumeDate(root);
				System.exit(0);
			}
			System.out.println("正在更新索引...");
			genJson(root);
		}
//		if(root.isDirectory()) {
//			File[] files = root.listFiles();
//			for(File file : files) {
//				System.out.println(file);
//			}
//			//FileOutputStream fos = new FileOutputStream(new File("output_confirmation"));
//			//fos.close();
//		}
	}

}
