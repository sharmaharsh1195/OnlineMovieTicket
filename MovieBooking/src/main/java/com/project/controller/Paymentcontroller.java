package com.project.controller;

import com.project.DTO.OrderRequest;
import netscape.javascript.JSObject;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import com.razorpay.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
public class Paymentcontroller {

@PostMapping("/user/create_order")
@ResponseBody
    public String createOrder(@RequestBody OrderRequest orderdata) throws RazorpayException {
   var client= new RazorpayClient("rzp_test_7wYcvB96CX6ZGp","75VixFhVfu4TxgOwlsYJa3TX");
    int amount=orderdata.getAmount();
    JSONObject ob=new JSONObject();
    ob.put("amount",amount*100);
    ob.put("currency","INR");
    ob.put("receipt","txn_2345");

    //creating new order

   Order order= client.Orders.create(ob);
   System.out.println("order"+order);



    return order.toString();
}
}
