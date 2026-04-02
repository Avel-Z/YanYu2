export const mapPoints = [
  { id: 1, name: '中山路骑楼', type: '招牌', lat: 24.4498, lng: 118.0819, district: '思明', description: '百年南洋风骑楼建筑群，保存完好的闽南商业街道', mapPos: { left: '30%', top: '58%' } },
  { id: 2, name: '南普陀寺', type: '古厝', lat: 24.4427, lng: 118.0874, district: '思明', description: '著名佛教圣地，闽南建筑精华', mapPos: { left: '35%', top: '65%' } },
  { id: 3, name: '鼓浪屿老照片', type: '老照片', lat: 24.4486, lng: 118.0656, district: '思明', description: '百年历史影像记录', mapPos: { left: '20%', top: '55%' } },
  { id: 4, name: '集美学村', type: '古厝', lat: 24.5742, lng: 118.0975, district: '集美', description: '陈嘉庚先生创建，闽南与西洋建筑融合', mapPos: { left: '50%', top: '30%' } },
  { id: 5, name: '同安孔庙', type: '招牌', lat: 24.7233, lng: 118.1528, district: '同安', description: '闽南地区保存最完好的孔庙之一', mapPos: { left: '60%', top: '15%' } },
  { id: 6, name: '翔安闽南大厝', type: '古厝', lat: 24.6195, lng: 118.2456, district: '翔安', description: '传统闽南红砖大厝聚落', mapPos: { left: '80%', top: '40%' } },
  { id: 7, name: '海沧青礁慈济宫', type: '招牌', lat: 24.4832, lng: 117.9321, district: '海沧', description: '保生大帝祖庙，闽台民间信仰圣地', mapPos: { left: '10%', top: '42%' } },
  { id: 8, name: '湖里老工厂', type: '老照片', lat: 24.5134, lng: 118.1273, district: '湖里', description: '厦门经济特区早期工业遗址', mapPos: { left: '48%', top: '48%' } },
]

export const activities = [
  { id: 1, title: '闽南语歌谣传承工作坊', location: '思明区文化宫', date: '2024-03-15 14:00', type: '文化活动', coverImg: 'https://picsum.photos/300/200?random=1' },
  { id: 2, title: '古厝保护志愿者招募', location: '集美区陈嘉庚纪念馆', date: '2024-03-18 09:00', type: '志愿活动', coverImg: 'https://picsum.photos/300/200?random=2' },
  { id: 3, title: '闽南民俗摄影大赛', location: '厦门全域', date: '2024-03-20 截止', type: '竞赛', coverImg: 'https://picsum.photos/300/200?random=3' },
]

export const hotSpots = [
  { id: 1, name: '中山路闽南方言景观带', tags: ['方言标牌', '骑楼', '历史街区'], views: 3821, cover: 'https://picsum.photos/300/200?random=4', district: '思明' },
  { id: 2, name: '集美学村语言景观群', tags: ['石刻', '楹联', '闽南文化'], views: 2654, cover: 'https://picsum.photos/300/200?random=5', district: '集美' },
  { id: 3, name: '鼓浪屿多语标牌遗迹', tags: ['历史标牌', '多语景观', '殖民时期'], views: 4102, cover: 'https://picsum.photos/300/200?random=6', district: '思明' },
  { id: 4, name: '同安银城老街方言景观', tags: ['老街', '民间文学', '传统工艺'], views: 1893, cover: 'https://picsum.photos/300/200?random=7', district: '同安' },
]

export const activityFeed = [
  { id: 1, time: '10分钟前', type: '投稿', content: '用户@闽南阿伯 上传了"厦港渔村方言录音"' },
  { id: 2, time: '32分钟前', type: '打卡', content: '用户@小岛探索者 在中山路完成打卡并获得"街区达人"徽章' },
  { id: 3, time: '1小时前', type: '收藏', content: '《南音·望明月》获得本周最多收藏' },
  { id: 4, time: '2小时前', type: '活动', content: '闽南语歌谣传承工作坊报名通道开启，已有38人报名' },
  { id: 5, time: '3小时前', type: '投稿', content: '用户@鼓浪屿旧时光 上传了"百年骑楼楹联集"' },
  { id: 6, time: '5小时前', type: '打卡', content: '集美学村今日打卡人数突破100人' },
]

export const corpusList = [
  { id: 1, title: '厦门闽南语核心词汇集', type: '词汇', tags: ['核心词汇', '厦门腔', '口语'], views: 5234, favorites: 312, cover: 'https://picsum.photos/300/200?random=8', summary: '收录厦门方言核心词汇3000余条，含发音标注与普通话对照' },
  { id: 2, title: '南音经典曲目《望明月》', type: '音乐', tags: ['南音', '非遗', '演唱'], views: 8901, favorites: 567, cover: 'https://picsum.photos/300/200?random=9', summary: '南音传统曲目，由厦门南音乐团演绎，附闽南语歌词注音' },
  { id: 3, title: '闽南民间故事：虎爷传说', type: '故事', tags: ['民间故事', '虎爷', '民俗'], views: 3102, favorites: 198, cover: 'https://picsum.photos/300/200?random=10', summary: '流传于闽南地区的虎爷神明故事，含闽南语版本朗读' },
  { id: 4, title: '歌仔戏经典折子戏集锦', type: '戏曲', tags: ['歌仔戏', '布袋戏', '表演艺术'], views: 4567, favorites: 289, cover: 'https://picsum.photos/300/200?random=11', summary: '厦门歌仔戏剧团经典折子戏录像存档，含台词字幕' },
  { id: 5, title: '海峡两岸闽南语对比研究', type: '研究', tags: ['学术', '两岸', '方言研究'], views: 2341, favorites: 145, cover: 'https://picsum.photos/300/200?random=12', summary: '厦门与台湾闽南语差异比较分析，含语音、词汇、语法层面' },
  { id: 6, title: 'AI复原：民国厦港渔歌', type: 'AI复原', tags: ['AI声景', '渔歌', '历史复原'], views: 6789, favorites: 423, cover: 'https://picsum.photos/300/200?random=13', summary: '基于历史录音资料，运用AI技术复原1930年代厦港渔歌声景' },
]

export const myCheckins = [
  { id: 1, location: '中山路骑楼', time: '2024-03-10 14:32', status: '已审核', district: '思明' },
  { id: 2, location: '南普陀寺', time: '2024-03-08 10:15', status: '已审核', district: '思明' },
  { id: 3, location: '集美学村', time: '2024-03-05 09:48', status: '已审核', district: '集美' },
  { id: 4, location: '鼓浪屿日光岩', time: '2024-02-28 15:20', status: '已审核', district: '思明' },
  { id: 5, location: '同安孔庙', time: '2024-02-20 11:05', status: '待审核', district: '同安' },
]

export const mySubmissions = [
  { id: 1, title: '中山路商铺闽南语招牌调查', category: '方言景观', status: '已上线', district: '思明', date: '2024-03-01', views: 234 },
  { id: 2, title: '集美渔港渔民访谈录音', category: '口述历史', status: '审核中', district: '集美', date: '2024-03-08', views: 0 },
  { id: 3, title: '同安民间歌谣手稿', category: '民间文学', status: '待审核', district: '同安', date: '2024-03-12', views: 0 },
  { id: 4, title: '鼓浪屿老洋行多语标牌', category: '历史文献', status: '已上线', district: '思明', date: '2024-02-15', views: 512 },
]

export const achievements = [
  { id: 1, name: '初探者', icon: '🗺️', unlocked: true, desc: '完成首次打卡' },
  { id: 2, name: '街区达人', icon: '🏘️', unlocked: true, desc: '在同一街区打卡5次' },
  { id: 3, name: '方言守护者', icon: '🎙️', unlocked: true, desc: '上传首个语音素材' },
  { id: 4, name: '文化传播者', icon: '📢', unlocked: true, desc: '投稿被收录入语库' },
  { id: 5, name: '厦门通', icon: '🏙️', unlocked: false, desc: '解锁厦门全部6个区' },
  { id: 6, name: '南音传人', icon: '🎵', unlocked: false, desc: '收听南音曲目超过50首' },
  { id: 7, name: '古厝守望者', icon: '🏯', unlocked: false, desc: '记录古厝建筑超过20处' },
  { id: 8, name: '语言学家', icon: '📚', unlocked: false, desc: '贡献词汇条目超过100条' },
]

export const shopItems = [
  { id: 1, name: '闽南文化明信片套装', points: 200, category: '文创', stock: 50, cover: 'https://picsum.photos/200/200?random=14' },
  { id: 2, name: '南音乐谱精装本', points: 500, category: '文创', stock: 20, cover: 'https://picsum.photos/200/200?random=15' },
  { id: 3, name: '厦门老街地图海报', points: 300, category: '文创', stock: 35, cover: 'https://picsum.photos/200/200?random=16' },
  { id: 4, name: '闽南语学习手册', points: 150, category: '书籍', stock: 100, cover: 'https://picsum.photos/200/200?random=17' },
  { id: 5, name: '中山路老字号优惠券', points: 100, category: '合作商家', stock: 200, cover: 'https://picsum.photos/200/200?random=18' },
  { id: 6, name: '南音茶馆体验券', points: 400, category: '合作商家', stock: 15, cover: 'https://picsum.photos/200/200?random=19' },
]
