async function generateCopy(product) {
  const prompt = `
你是顶级电商文案大师，请为以下产品生成：
1. 3个爆款标题
2. 5个核心卖点
3. 情绪关键词

产品：${product}
风格：高端、简洁、有购买欲
`;

  const res = await fetch("AI接口", {
    method: "POST",
    body: JSON.stringify({ prompt })
  });

  return res.json();
}
