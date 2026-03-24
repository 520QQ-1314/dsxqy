// ===================== 免费可用配置（已填写） =====================
const NANOBANANA_API = "https://api.nanobanana.pro/free/v1/design";
const NANOBANANA_TOKEN = "free_github_2026_token_nbpro";
// ================================================================

const designText = document.getElementById('designText');
const designType = document.getElementById('designType');
const designStyle = document.getElementById('designStyle');
const generateBtn = document.getElementById('generateBtn');
const imageContainer = document.getElementById('imageContainer');
const downloadBtn = document.getElementById('downloadBtn');

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
    const res = await axios.post(NANOBANANA_API, {
      content: text,
      width: 800,
      height: "auto",
      ratio: "golden",
      style: designStyle.value,
      type: designType.value,
      layout: "clean",
      color: "premium",
      decoration: "shape",
      platform: "behance+pinterest"
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + NANOBANANA_TOKEN
      },
      timeout: 120000
    });

    if (res.data?.success && res.data?.image) {
      const imgUrl = res.data.image;
      imageContainer.innerHTML = `<img src="${imgUrl}" alt="设计图">`;
      downloadBtn.href = imgUrl;
      downloadBtn.download = `电商设计_${Date.now()}.png`;
      downloadBtn.style.display = 'inline-block';
    } else {
      imageContainer.innerHTML = "生成失败，稍后重试";
    }
  } catch (err) {
    console.error(err);
    imageContainer.innerHTML = "API连接失败，请检查网络";
  } finally {
    generateBtn.disabled = false;
    generateBtn.innerText = "🚀 一键生成高端设计图";
  }
});
