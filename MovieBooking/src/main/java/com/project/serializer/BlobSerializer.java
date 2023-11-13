package com.project.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

public class BlobSerializer extends JsonSerializer<Blob> {
    @Override
    public void serialize(Blob value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        try {
            byte[] bytes = value.getBytes(1, (int) value.length());
            gen.writeBinary(bytes);
        } catch (SQLException e) {
            throw new IOException(e);
        }
    }
}
