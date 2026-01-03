
import { GoogleGenAI } from "@google/genai";
import { DesignConfig } from "../types";

export const generateLacquerDesigns = async (config: DesignConfig): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const angles = [
    "正面平视英雄视角，展示整体器型和比例 (Front eye-level hero shot showing overall proportions)",
    "俯视视角，聚焦顶部盖子和精致纹样细节 (Bird's-eye view looking down at the lid and top details)",
    "极端宏观特写，展示漆面光泽、纹理和镶嵌工艺细节 (Extreme macro close-up focus on the texture and grain)"
  ];

  const basePrompt = `高质量艺术摄影，传统东方工艺美术漆器。
  器型: ${config.form}。
  底色: ${config.baseColor}。
  主纹样: ${config.pattern}。
  核心技法: ${config.technique}。
  用户自定义细节: ${config.customDetail}。
  光影: 柔和的博物馆级别灯光，优雅的阴影，深邃的高光反射，极高分辨率，写实风格，体现出大漆深邃而温润的质感。`;

  const generationPromises = angles.map(angle => {
    const fullPrompt = `${basePrompt} 拍摄角度: ${angle}.`;
    return ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: fullPrompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
  });

  try {
    const results = await Promise.all(generationPromises);
    const imageUrls: string[] = [];

    for (const res of results) {
      for (const part of res.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrls.push(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    }
    
    if (imageUrls.length === 0) throw new Error("未能生成图像");
    return imageUrls;
  } catch (error) {
    console.error("多角度设计生成失败:", error);
    throw error;
  }
};
