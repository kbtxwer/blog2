package blog2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import jdk.internal.jline.internal.InputStreamReader;
import sun.awt.CharsetString;

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
		for(File f:root.listFiles()) {
			if(f.isDirectory()) {
				if(f.getName().contains("_files")||f.getName().equals("src")||f.getName().equals("bin")||f.getName().equals(".git")) {
					continue;
				}
				resumeDate(f);
			}else {
				//恢复所有文章的修改日期
				//先找到索引文件
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
				JSONArray articles = JSONObject.parseObject(sb.toString()).getJSONArray("article");
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
			}
		}
	}
	
	public static void main(String[] args) throws Exception {
		// TODO 自动生成的方法存根
		File root = new File("");
		
		if(args.length>0 && args[0].equals("resume")) {
			root = new File(root.getAbsolutePath());
			resumeDate(root);
			
		}else {
			File indexFile = new File(root.getAbsolutePath() + "/json_utf8");
			File gitRepoDir= new File(root.getAbsolutePath() + "/.git");
			//如果git仓库不存在，阻止运行
			if(!gitRepoDir.exists()) {
				System.out.println("git 仓库未找到，为保证索引文件不被破坏，此命令无法执行！");
				System.exit(-1);
			}
			//如果索引文件和 .git 仓库的修改日期一致，说明仓库是刚刚克隆下来的，不能执行生成命令
			if(indexFile.exists()&&indexFile.lastModified()==gitRepoDir.lastModified()) {
				System.out.println("仓库可能是刚刚克隆下来的，请先执行 resume命令恢复文件的修改日期");
				System.exit(-1);
			}
			root = new File(root.getAbsolutePath());
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
