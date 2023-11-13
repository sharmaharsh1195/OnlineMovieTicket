package com.project.services;

import java.awt.image.BufferedImage;
import java.io.*;
import java.util.zip.Deflater;
import java.util.zip.Inflater;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class ImageUtils {

    public static byte[] compressImage(byte[] data) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            Deflater deflater = new Deflater();
            deflater.setLevel(Deflater.BEST_COMPRESSION);
            deflater.setInput(data);
            deflater.finish();
            byte[] tmp = new byte[4 * 1024];
            while (!deflater.finished()) {
                int size = deflater.deflate(tmp);
                outputStream.write(tmp, 0, size);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return data; // Return the original data if an error occurs during compression
        } finally {
            try {
                outputStream.close();
            } catch (IOException ignored) {
            }
        }
        return outputStream.toByteArray();
    }


    public static byte[] resizeImage(byte[] data, int maxWidth, int maxHeight) {
        try {
            ByteArrayInputStream input = new ByteArrayInputStream(data);
            BufferedImage image = ImageIO.read(input);
            int originalWidth = image.getWidth();
            int originalHeight = image.getHeight();

            if (originalWidth > maxWidth || originalHeight > maxHeight) {
                double scale = Math.min((double) maxWidth / originalWidth, (double) maxHeight / originalHeight);
                int newWidth = (int) (originalWidth * scale);
                int newHeight = (int) (originalHeight * scale);

                BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
                resizedImage.getGraphics().drawImage(image, 0, 0, newWidth, newHeight, null);

                ByteArrayOutputStream output = new ByteArrayOutputStream();
                ImageIO.write(resizedImage, "jpg", output);

                return output.toByteArray();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return data; // Return original data if no resizing was needed or an error occurred.
    }



    public static byte[] decompressImage(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }

}
