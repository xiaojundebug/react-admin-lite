import Mock from "mockjs";

Mock.setup({
  // 模拟延迟（200-600毫秒之间）
  timeout: "200-600"
});

Mock.mock(/login/, {
  t: {
    account: "362896731@qq.com",
    name: "admin",
    merchantId: "10021"
  }
});

Mock.mock(/getMerchantInfo/, {
  t: {
    "account|3-8": [
      {
        name: "@cname",
        account: "@email"
      }
    ],
    "product|5-10": [
      {
        "productId|5": /\d/,
        "productType|1": [10, 20, 30, 40, 50],
        "status|0-1": 0,
        "road|5-10": [
          {
            name: "测试商户",
            roadCode: /10021\d{6}/,
            "status|0-1": 0
          }
        ]
      }
    ]
  }
});

Mock.mock(/order-query/, {
  t: {}
});

Mock.mock(/trade-query/, {
  "t|10": [
    {
      "id|+1": 0,
      merOrderNo: /\d{12}/,
      payOrderId: /\d{12}/,
      roadCode: /10021\d{6}/,
      merName: "@word()",
      "amount|10-10000.2-2": 10,
      "status|1": [10, 20, 30, 40, 50],
      createTime: "@date('yyyy-MM-dd hh:mm:ss')"
    }
  ]
});
