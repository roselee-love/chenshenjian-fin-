
import React from 'react';
import { Shield, Sparkles, Feather, Zap, Layers, Wind } from 'lucide-react';

const CraftInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
          <Shield className="text-amber-500 w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">漆色与涂装</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          大漆乃漆树之液，经精炼后逐层涂抹。黑漆（乌漆）如墨玉深邃，朱漆（赤漆）如旭日明媚，更有溜涂展现透彻之美。
        </p>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
          <Sparkles className="text-amber-400 w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">莳绘与梨地</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          以金、银屑洒在湿漆表面形成的华丽图案。梨地（Nashiji）通过较粗的金屑营造出如梨皮般闪烁的质感，极具奢华感。
        </p>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
          <Feather className="text-indigo-400 w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">螺钿镶嵌</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          截取鲍鱼壳、珍珠贝等自然材质，磨至极薄并切成纹样镶嵌于漆面。随光影变幻出幻彩虹光，灵动非凡。
        </p>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
          <Zap className="text-rose-400 w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">沈金工艺</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          在完全干燥的漆面上，用极细的刻刀勾勒线条，随后在细沟中填入金箔或金粉，使图案如丝绸般细腻。
        </p>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
          <Layers className="text-emerald-400 w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">平纹与堆漆</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          平纹是在漆层中嵌入金属薄片（平脱）；堆漆则是通过数层漆的堆叠并进行浮雕式的刻画，即所谓的“剔红”。
        </p>
      </div>
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
          <Wind className="text-sky-400 w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">变涂与根来</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          变涂利用多种工具创造奇幻纹理；根来涂则利用红黑两层漆的磨损，展现出岁月的痕迹与质朴的禅意。
        </p>
      </div>
    </div>
  );
};

export default CraftInfo;
