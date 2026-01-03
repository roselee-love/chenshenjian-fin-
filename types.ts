
export interface GeneratedDesign {
  id: string;
  imageUrls: string[];
  prompt: string;
  timestamp: number;
  config: DesignConfig;
}

export interface DesignConfig {
  baseColor: string;
  pattern: string;
  technique: string;
  form: string;
  customDetail: string;
}

export const LACQUER_COLORS = [
  { id: 'black', label: '黑漆 (Kuro-Urushi)' },
  { id: 'vermilion', label: '朱漆 (Shu-Urushi)' },
  { id: 'brown', label: '溜涂 (Tame-Nuri)' },
  { id: 'green', label: '绿漆 (Seigai)' },
  { id: 'gold', label: '白檀涂 (Byakudan)' },
  { id: 'blue', label: '蓝漆 (Aoi-Urushi)' },
  { id: 'purple', label: '紫漆 (Murasaki)' },
  { id: 'gold_foil', label: '金箔底 (Gold Foil)' },
  { id: 'silver_foil', label: '银箔底 (Silver Foil)' },
];

export const PATTERNS = [
  { id: 'orchid', label: '兰花 (Ran)' },
  { id: 'bamboo', label: '翠竹 (Take)' },
  { id: 'plum', label: '墨梅 (Ume)' },
  { id: 'crane', label: '仙鹤 (Tsuru)' },
  { id: 'clouds', label: '祥云 (Kumo)' },
  { id: 'waves', label: '青海波 (Seigaiha)' },
  { id: 'dragon', label: '龙纹 (Ryu)' },
  { id: 'phoenix', label: '凤纹 (Houou)' },
  { id: 'karakusa', label: '唐草纹 (Karakusa)' },
  { id: 'cherry', label: '樱花 (Sakura)' },
  { id: 'maple', label: '枫叶 (Momiji)' },
  { id: 'peony', label: '牡丹 (Botan)' },
];

export const TECHNIQUES = [
  { id: 'makie', label: '莳绘 (金银粉)' },
  { id: 'raden', label: '螺钿 (贝壳镶嵌)' },
  { id: 'chinkin', label: '沈金 (刻线填金)' },
  { id: 'hyomon', label: '平纹 (金属片)' },
  { id: 'nashiji', label: '梨地 (颗粒金粉)' },
  { id: 'kawari', label: '变涂 (漆面纹理)' },
  { id: 'negoro', label: '根来涂 (磨损质感)' },
  { id: 'kamakura', label: '镰仓雕 (雕刻涂)' },
  { id: 'tsuishu', label: '堆漆 (剔红)' },
];

export const FORMS = [
  { id: 'natsume', label: '枣罐 (茶道用)' },
  { id: 'box', label: '香盒 (合子)' },
  { id: 'plate', label: '圆盘 (果盘)' },
  { id: 'vase', label: '花瓶 (器皿)' },
  { id: 'jubako', label: '重箱 (多层盒)' },
  { id: 'octagonal', label: '八角盒 (文房)' },
  { id: 'bitong', label: '笔筒 (书斋)' },
  { id: 'bowl', label: '漆碗 (食器)' },
  { id: 'teabox', label: '茶叶罐 (圆筒)' },
];
