
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Send, History, ExternalLink, Sparkles, Palette, Loader2, 
  ChevronLeft, ChevronRight, Maximize2, Layers, Grid 
} from 'lucide-react';
import { generateLacquerDesigns } from './services/geminiService';
import { 
  GeneratedDesign, DesignConfig, 
  LACQUER_COLORS, PATTERNS, TECHNIQUES, FORMS 
} from './types';
import CraftInfo from './components/CraftInfo';

const App: React.FC = () => {
  const [config, setConfig] = useState<DesignConfig>({
    baseColor: LACQUER_COLORS[0].label,
    pattern: PATTERNS[0].label,
    technique: TECHNIQUES[0].label,
    form: FORMS[8].label, // 茶叶罐
    customDetail: '顶部用金色绘制了兰花线条，围绕茶叶罐卷草纹简洁一点，隐约点缀颗粒状螺钿'
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentDesign, setCurrentDesign] = useState<GeneratedDesign | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [history, setHistory] = useState<GeneratedDesign[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    setActiveImageIndex(0);
    
    try {
      const imageUrls = await generateLacquerDesigns(config);
      const newDesign: GeneratedDesign = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrls,
        prompt: `使用 ${config.baseColor} 底漆的 ${config.form}，装饰 ${config.pattern} 和 ${config.technique}。细节: ${config.customDetail}`,
        timestamp: Date.now(),
        config: { ...config }
      };
      
      setCurrentDesign(newDesign);
      setHistory(prev => [newDesign, ...prev].slice(0, 10));
    } catch (err) {
      setError('生成失败。工坊正忙，请稍后再试。');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [config]);

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen lacquer-gradient pb-20 px-4 sm:px-6 lg:px-8">
      {/* 顶部导航 */}
      <nav className="max-w-7xl mx-auto py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Palette className="text-zinc-950 w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gold-text serif">漆艺工坊 Pro | LacquerArt</h1>
            <p className="text-zinc-500 text-xs tracking-widest uppercase">东方美学 3D 多角度预览系统</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-500 transition-all text-sm group"
          >
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            计费文档
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 左侧：参数设定 */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="text-zinc-100 font-semibold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                工坊规格设定
              </h2>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2 block">底色选择 (Base Color)</label>
                    <select 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                      value={config.baseColor}
                      onChange={(e) => setConfig({...config, baseColor: e.target.value})}
                    >
                      {LACQUER_COLORS.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2 block">器型类别 (Form)</label>
                    <select 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                      value={config.form}
                      onChange={(e) => setConfig({...config, form: e.target.value})}
                    >
                      {FORMS.map(f => <option key={f.id} value={f.label}>{f.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2 block">主装饰纹样 (Motif)</label>
                    <select 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                      value={config.pattern}
                      onChange={(e) => setConfig({...config, pattern: e.target.value})}
                    >
                      {PATTERNS.map(p => <option key={p.id} value={p.label}>{p.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2 block">核心工艺技法 (Technique)</label>
                    <select 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                      value={config.technique}
                      onChange={(e) => setConfig({...config, technique: e.target.value})}
                    >
                      {TECHNIQUES.map(t => <option key={t.id} value={t.label}>{t.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2 block">细节描述与补充 (Exquisite Details)</label>
                  <textarea
                    value={config.customDetail}
                    onChange={(e) => setConfig({...config, customDetail: e.target.value})}
                    placeholder="例如：卷草纹疏密、金粉细度、螺钿排布..."
                    className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 focus:ring-2 focus:ring-amber-500/30 outline-none transition-all resize-none text-sm leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      匠心打造中 (一次生成3张)...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      开启创作
                    </>
                  )}
                </button>
                {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
              </div>
            </section>

            <section className="px-2">
              <h3 className="text-zinc-500 font-semibold text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                <History className="w-4 h-4" />
                历任杰作
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {history.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => {
                      setCurrentDesign(design);
                      setActiveImageIndex(0);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                      currentDesign?.id === design.id ? 'border-amber-500 ring-2 ring-amber-500/20 scale-105 shadow-md' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={design.imageUrls[0]} alt="History" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 右侧：多角度效果展示 */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative group min-h-[500px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-zinc-500/5 to-indigo-500/10 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                {isGenerating ? (
                  <div className="aspect-square flex flex-col items-center justify-center gap-8 text-center p-20">
                    <div className="relative">
                      <div className="w-24 h-24 border-2 border-zinc-800 rounded-full animate-ping opacity-20"></div>
                      <Loader2 className="w-12 h-12 text-amber-500 animate-spin absolute inset-0 m-auto" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold serif text-zinc-100 mb-2">正在研磨大漆...</h3>
                      <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                        正在构思并渲染三组视角：全貌、顶部构图以及微观纹理细节。
                      </p>
                    </div>
                  </div>
                ) : currentDesign ? (
                  <div className="flex flex-col">
                    {/* 主图 */}
                    <div className="aspect-square relative overflow-hidden bg-black">
                      <img 
                        src={currentDesign.imageUrls[activeImageIndex]} 
                        alt="漆器预览" 
                        className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000"
                      />
                      
                      {/* 导航按钮 */}
                      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                        <button 
                          onClick={() => setActiveImageIndex(prev => (prev > 0 ? prev - 1 : currentDesign.imageUrls.length - 1))}
                          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-colors pointer-events-auto shadow-xl"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={() => setActiveImageIndex(prev => (prev < currentDesign.imageUrls.length - 1 ? prev + 1 : 0))}
                          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-colors pointer-events-auto shadow-xl"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="absolute bottom-6 right-6">
                        <button 
                          onClick={() => window.open(currentDesign.imageUrls[activeImageIndex], '_blank')}
                          className="p-3 bg-zinc-950/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-zinc-950/80 transition-all"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* 缩略图栏 */}
                    <div className="bg-zinc-900/50 p-6 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800 gap-4">
                      <div className="flex gap-4">
                        {currentDesign.imageUrls.map((url, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                              activeImageIndex === idx ? 'border-amber-500 scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'
                            }`}
                          >
                            <img src={url} alt={`视角 ${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                      <div className="text-center sm:text-right">
                        <h4 className="text-zinc-100 font-bold serif text-xl mb-1">{currentDesign.config.form}</h4>
                        <p className="text-zinc-500 text-xs tracking-wide">
                          {currentDesign.config.technique} • {currentDesign.config.baseColor}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square flex flex-col items-center justify-center gap-4 text-zinc-700">
                    <Grid className="w-16 h-16 opacity-10" />
                    <p className="serif italic">设定您的工坊规格，开启漆艺创作</p>
                  </div>
                )}
              </div>
            </div>

            {/* 工艺百科 */}
            <div className="mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-zinc-800"></div>
                <h2 className="text-2xl font-bold serif text-zinc-100">匠人知识库</h2>
                <div className="h-px flex-1 bg-zinc-800"></div>
              </div>
              <CraftInfo />
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-20 text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em] border-t border-zinc-900 pt-12">
        <p>© 2024 LacquerArt Studio Pro. 基于 AI 的传统大漆视觉生成系统.</p>
        <p className="mt-4 text-zinc-800">致力于东方漆艺美学的数字化呈现与传承.</p>
      </footer>
    </div>
  );
};

export default App;
