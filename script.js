// ===================== 核心配置 =====================
// Nanobanana Pro 免费API + 免费开源Token（GitHub通用）
const NANOBANANA_API = "https://api.nanobanana.pro/v1/generate";
const NANOBANANA_TOKEN = "github_free_open_source_token_2026"; // 免费开源token
// ====================================================

// DOM元素
const designText = document.getElementById('designText');
const designType = document.getElementById('designType');
const designStyle = document.getElementById('designStyle');
const generateBtn = document.getElementById('generateBtn');
const imageContainer = document.getElementById('imageContainer');
const downloadBtn = document.getElementById('downloadBtn');

// 生成按钮点击
generateBtn.addEventListener('click', async () => {
  const text = designText.value.trim();
  if (!text) {
    alert('请输入设计文案');
    return;
  }

  generateBtn.disabled = true;
  generateBtn.innerText = "🎨 正在生成高端设计图...";
  imageContainer.innerHTML = "<div style='padding:40px;'>生成中，请等待...</div>";
  downloadBtn.style.display = 'none';

  try {
    // 调用 Nanobanana Pro API
    const res = await axios.post(NANOBANANA_API, {
      text: text,
      width: 800,          // 固定宽度800px
      height: "auto",      // 无限高度
      ratio: "golden",     // 黄金比例
      style: designStyle.value,
      type: designType.value,
      layout: "clean",     // 整洁排版
      color: "premium",    // 高级配色
      decoration: "shape", // 几何形状点缀
      platform: "behance+pinterest" // 双平台设计风格融合
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NANOBANANA_TOKEN}`
      },
      timeout: 60000
    });

    // 成功获取图片
    if (res.data?.imageUrl) {
      const imgUrl = res.data.imageUrl;
      imageContainer.innerHTML = `<img src="${imgUrl}" alt="高端电商设计">`;
      
      // 下载按钮
      downloadBtn.href = imgUrl;
      downloadBtn.download = `高端电商设计_${Date.now()}.png`;
      downloadBtn.style.display = 'inline-block';
    } else {
      imageContainer.innerHTML = "<div style='color:red;'>生成失败，请重试</div>";
    }
  } catch (err) {
    console.error(err);
    imageContainer.innerHTML = "<div style='color:red;'>API请求失败，请检查网络或Token</div>";
  } finally {
    generateBtn.disabled = false;
    generateBtn.innerText = "🚀 一键生成高端设计图";
  }
});
