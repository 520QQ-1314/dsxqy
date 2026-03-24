import { writePsd } from "ag-psd";

const psd = {
  width: 800,
  height: 1200,
  children: [
    {
      name: "title",
      text: {
        value: "高端抗老精华",
        fontSize: 48
      }
    }
  ]
};

writePsd(psd, fs.writeFileSync("output.psd"));
