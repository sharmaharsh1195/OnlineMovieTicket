//package com.project.services.implementation;
//
//import com.project.services.FileService;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.UUID;
//
//@Service
//public class FileServiceImpl implements FileService{
//
//    @Override
//    public String uploadImage(String path, MultipartFile file) throws IOException {
//
//        //file name
//        String name=file.getOriginalFilename();
//
//        String randomID= UUID.randomUUID().toString();
//
//        String fileName1=randomID.concat(name.substring(name.lastIndexOf(".")));
//
//        //make full path to file
//
//    String filePath=path+ File.separator+fileName1;
//        //if images folder is not there we will create it
//
//
//    File f=new File(path);
//    if(!f.exists())
//    {
//        f.mkdir();
//
//    }
//        //copy file
//
//        Files.copy(file.getInputStream(), Paths.get(filePath));
//
//        return fileName1;
//    }
//}
