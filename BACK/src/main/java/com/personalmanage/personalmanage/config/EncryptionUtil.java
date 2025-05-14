package com.personalmanage.personalmanage.config;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class EncryptionUtil {
    private static final String SECRET_KEY = "clave-super-secreta123"; // mejor: cargar desde config

    public static String encrypt(String strToEncrypt) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");

        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] encrypted = cipher.doFinal(strToEncrypt.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public static String decrypt(String strToDecrypt) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");

        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);

        byte[] decoded = Base64.getDecoder().decode(strToDecrypt);
        byte[] decrypted = cipher.doFinal(decoded);

        return new String(decrypted);
    }
}
