package blog2;

import java.io.File;
import java.io.FileOutputStream;
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
				if(f.getName().equals("src")||f.getName().equals("bin")||f.getName().equals(".git")) {
					continue;
				}
				genJson(f);
			}else {
				//应当只对文章进行索引
				if(f.getName().contains(".html")&&!f.getName().contains("json")&&!f.getName().contains("index")) {
					articles.put(f.lastModified(), f.getName());
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
		fos.write(cjo.toString().getBytes());
		fos.close();
	}
	
	public static void main(String[] args) throws Exception {
		// TODO 自动生成的方法存根
		File root = new File("");
		root = new File(root.getAbsolutePath());
		
		genJson(root);
		
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
