import React, { useState } from 'react';
import { Page, ObservationItem } from './types';
import { Navigation } from './components/Navigation';
import { RetroCard } from './components/RetroCard';
import { chatWithMentor } from './services/gemini';
import { Sparkles, MessageCircle, Eye, Smile, Frown, Star, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.INTRO);
  
  // --- State for Story Chat ---
  const [storyInput, setStoryInput] = useState('');
  const [storyResponse, setStoryResponse] = useState('');
  const [loadingStory, setLoadingStory] = useState(false);
  const [showStoryAnswers, setShowStoryAnswers] = useState(false);

  // --- State for Scenarios (Possible Answers) ---
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});

  // --- State for Places Description ---
  const [placeDescription, setPlaceDescription] = useState('');

  const toggleAnswer = (id: string) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Hardcoded descriptions for Social Observation
  const observationItems: ObservationItem[] = [
    { 
      id: 'reading', 
      term: '讀書會', 
      icon: '📚', 
      prompt: 'Reading Club',
      description: '大家聚在一起看書、分享故事心得的活動。可以認識很多愛看書的新朋友喔！'
    },
    { 
      id: 'charity', 
      term: '公益活動', 
      icon: '🤲', 
      prompt: 'Charity Activity',
      description: '幫助別人或愛護環境的活動，像是去海邊撿垃圾，或是探訪獨居的老爺爺老奶奶。'
    },
    { 
      id: 'sports', 
      term: '體育比賽', 
      icon: '🏆', 
      prompt: 'Sports Competition',
      description: '社區舉辦的運動會，大家一起比賽跑步、打球，鍛鍊身體也聯絡感情。'
    },
    { 
      id: 'hometown', 
      term: '同鄉會', 
      icon: '🏮', 
      prompt: 'Hometown Association',
      description: '來自同一個家鄉的人聚在一起，大家說著家鄉話，互相幫忙、慶祝節日。'
    },
  ];

  const handleStoryChat = async (messageOverride?: string) => {
    const message = messageOverride || storyInput;
    if (!message.trim()) return;
    
    setLoadingStory(true);
    if (messageOverride) setStoryInput(messageOverride);

    const context = `Story: A library incident where students were noisy. Then Xiaohui cut a book because he wanted a butterfly picture. Haoen stopped him. Xiaohui apologized and fixed chairs.`;
    const response = await chatWithMentor(message, context);
    setStoryResponse(response);
    setLoadingStory(false);
    setStoryInput('');
  };

  const handlePlaceHelperClick = (text: string) => {
    setPlaceDescription(prev => {
      const separator = prev.length > 0 ? '，' : '';
      return prev + separator + text;
    });
  };

  // --- Data for Quick Options ---
  const storyQuickReplies = [
    "我覺得浩恩很勇敢！💪",
    "曉輝知錯能改，很棒👍",
    "在圖書館要保持安靜🤫",
    "我以後會愛護公物📚"
  ];

  const placeDescriptionHelpers = [
    "這裡有好多有趣的書📖",
    "我喜歡在這裡溜滑梯🛝",
    "可以認識新朋友👫",
    "這裡安靜又舒服😌",
    "我們會一起做運動🏀",
    "週末會舉辦活動🎈"
  ];

  // --- Render Functions ---

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-10 animate-fade-in py-10">
      <div className="relative p-8">
        <h1 className="text-6xl md:text-8xl font-black text-sky-500 tracking-wider">
          9. 積極參加
          <br />
          <span className="text-pink-500">社區活動</span>
        </h1>
        <div className="absolute -top-4 -right-4 animate-bounce">
          <Star size={64} className="fill-yellow-300 text-yellow-500" />
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl border-2 border-sky-100">
        <p className="text-2xl md:text-3xl text-gray-700 font-bold leading-relaxed">
          歡迎來到我們的快樂社區！🏘️ <br/>
          這裡有好多有趣的事情發生，讓我們一起去觀察、學習做個好鄰居吧！
        </p>
      </div>

      <button 
        onClick={() => setPage(Page.COMMUNITY_PLACES)}
        className="retro-btn text-3xl px-12 py-6 bg-yellow-300 hover:bg-yellow-200 text-yellow-900 shadow-yellow-200"
      >
        出發囉！🚀
      </button>
    </div>
  );

  const renderPlaces = () => (
    <div className="space-y-10 max-w-5xl mx-auto pb-28 animate-fade-in">
      <header className="text-center mb-12">
        <div className="inline-block bg-sky-200 px-8 py-4 rounded-full shadow-md mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-sky-900">豐富多彩的社區活動 🎡</h2>
        </div>
        <p className="text-xl md:text-2xl text-sky-700 font-bold">社區裡有好多好玩的地方，你去過哪裡呢？</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RetroCard title="交流天地" icon="🗣️" color="yellow" className="text-xl">
          <p className="mb-6 text-2xl font-bold text-yellow-900/80 border-b-2 border-yellow-200 pb-4">
            👇 點擊你有去過的地方，給它一個讚！
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['社區中心 🏫', '圖書館 📖', '體育館 🏀', '公園 🌳', '長者中心 👴', '游泳池 🏊'].map((place) => (
              <button key={place} className="retro-btn py-3 px-4 text-left bg-white border border-yellow-200 text-lg hover:bg-yellow-50 transition-colors">
                {place}
              </button>
            ))}
          </div>
        </RetroCard>

        <RetroCard title="活動介紹" icon="📢" color="pink">
          <div className="space-y-6">
             <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
               <h3 className="font-bold text-2xl text-pink-900 mb-3">我的秘密基地 🏰</h3>
               <textarea 
                 value={placeDescription}
                 onChange={(e) => setPlaceDescription(e.target.value)}
                 className="w-full p-4 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-400 bg-white h-32 resize-none text-xl font-medium"
                 placeholder="介紹一下你最常去的場所..."
               />
               
               {/* Quick Helper Chips */}
               <div className="mt-4">
                 <p className="text-sm font-bold text-pink-600 mb-2">✨ 點擊加入描述：</p>
                 <div className="flex flex-wrap gap-2">
                   {placeDescriptionHelpers.map((text, idx) => (
                     <button
                       key={idx}
                       onClick={() => handlePlaceHelperClick(text)}
                       className="bg-white border border-pink-200 rounded-full px-3 py-1 text-sm font-bold text-pink-700 hover:bg-pink-100 active:scale-95 transition-all shadow-sm"
                     >
                       {text}
                     </button>
                   ))}
                 </div>
               </div>
             </div>

             <div className="bg-white border-2 border-dashed border-pink-300 rounded-xl p-6 text-center text-pink-300 cursor-pointer hover:bg-pink-50 flex flex-col items-center justify-center min-h-[150px] transition-colors">
               <span className="text-4xl mb-2">📸</span>
               <p className="text-xl font-bold">貼上你的宣傳單</p>
             </div>
          </div>
        </RetroCard>
      </div>
    </div>
  );

  const renderObservation = () => (
    <div className="space-y-10 max-w-5xl mx-auto pb-28 animate-fade-in">
      <header className="text-center mb-12">
        <h2 className="text-5xl font-bold text-sky-800 flex items-center justify-center gap-4 mb-4">
          <Eye className="w-12 h-12" /> 社會觀察
        </h2>
        <p className="text-2xl text-sky-700 font-bold bg-white/60 inline-block px-6 py-2 rounded-full">
          觀察一下自己生活的社區，看看有哪些活動吧！
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {observationItems.map((item) => (
          <RetroCard 
            key={item.id}
            color="green"
            className="flex flex-col gap-4 min-h-[200px]"
          >
            <div className="flex items-center gap-4 border-b-2 border-green-100 pb-3 mb-0">
              <span className="text-5xl">{item.icon}</span>
              <span className="text-3xl font-bold text-green-800">{item.term}</span>
            </div>
            <p className="text-xl text-green-900 font-medium leading-relaxed">
              {item.description}
            </p>
          </RetroCard>
        ))}
      </div>

      <div className="mt-16 bg-white p-8 rounded-3xl border-2 border-sky-100 shadow-xl">
        <h3 className="text-3xl font-bold text-sky-800 mb-6 flex items-center gap-3">
          <MessageCircle className="w-8 h-8" /> 我的活動感言
        </h3>
        <textarea 
          className="w-full p-6 rounded-2xl border-2 border-sky-200 focus:outline-none focus:border-sky-400 focus:bg-sky-50 h-48 text-2xl leading-relaxed font-medium transition-colors"
          placeholder="你參加過什麼活動？寫下你的感想吧！例如：我覺得很開心，因為..."
        />
      </div>
    </div>
  );

  const renderMorality = () => (
    <div className="space-y-10 max-w-4xl mx-auto pb-28 animate-fade-in">
      <header className="text-center mb-10">
        <h2 className="text-5xl font-bold text-sky-900 bg-white px-8 py-4 rounded-full shadow-lg inline-block">
          參加活動有公德 ❤️
        </h2>
        <p className="text-2xl text-sky-700 mt-6 font-bold">
          公共設施是大家的，我們要愛護它們喔！
        </p>
      </header>

      <div className="space-y-8">
        {/* Scenario 1 */}
        <RetroCard title="場景一：圖書館" icon="🤫" color="blue" className="text-xl">
          <div className="flex flex-col md:flex-row gap-6 items-start">
             <div className="text-8xl p-4 bg-sky-50 rounded-2xl">📚</div>
             <div className="flex-1 space-y-4">
               <p className="font-bold text-2xl mb-2 text-sky-900">如果你看到書看完沒放回原處...</p>
               <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 space-y-3">
                 <p className="font-bold text-sky-800">💭 如果你是管理人員，你會怎麼想？</p>
                 <p className="font-bold text-sky-800">💭 如果你是下一個讀者，你有什麼感受？</p>
               </div>
             </div>
          </div>
          <button 
            onClick={() => toggleAnswer('s1')}
            className="mt-6 text-xl bg-sky-200 text-sky-900 rounded-xl px-4 py-3 hover:bg-sky-300 block w-full text-center font-bold transition-colors"
          >
            {showAnswer['s1'] ? '🙈 收起參考答案' : '✨ 看看參考答案'}
          </button>
          {showAnswer['s1'] && (
             <div className="mt-4 p-5 bg-sky-50 rounded-xl border-l-4 border-sky-400 text-sky-900 text-lg animate-fade-in">
               <span className="font-bold bg-sky-200 px-2 py-1 rounded mr-2 text-sm">參考答案</span>
               管理員會覺得整理很辛苦；下一個讀者會找不到書，覺得很著急、很失望。
             </div>
          )}
        </RetroCard>

        {/* Scenario 2 */}
        <RetroCard title="場景二：球場爭奪戰" icon="🏀" color="yellow" className="text-xl">
           <div className="flex flex-col md:flex-row gap-6 items-center">
             <div className="text-8xl p-4 bg-yellow-50 rounded-2xl">🏃</div>
             <div className="flex-1">
               <p className="font-bold text-2xl mb-4 text-yellow-900">有人大喊：「我先來！」直接衝進球場...</p>
               <p className="text-yellow-800 font-medium bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                 在享用公用設施時，如果每個人都只按照自己的意願活動，會發生什麼事？
               </p>
             </div>
          </div>
          <button 
            onClick={() => toggleAnswer('s2')}
            className="mt-6 text-xl bg-yellow-200 text-yellow-900 rounded-xl px-4 py-3 hover:bg-yellow-300 block w-full text-center font-bold transition-colors"
          >
            {showAnswer['s2'] ? '🙈 收起參考答案' : '✨ 看看參考答案'}
          </button>
          {showAnswer['s2'] && (
             <div className="mt-4 p-5 bg-yellow-50 rounded-xl border-l-4 border-yellow-400 text-yellow-900 text-lg animate-fade-in">
               <span className="font-bold bg-yellow-200 px-2 py-1 rounded mr-2 text-sm">參考答案</span>
               大家會吵架，甚至推擠受傷，最後誰都不能好好玩球了。我們要學會排隊和輪流喔！
             </div>
          )}
        </RetroCard>

         {/* Scenario 3 */}
         <RetroCard title="場景三：設施壞掉了" icon="🛠️" color="pink" className="text-xl">
           <div className="flex flex-col md:flex-row gap-6 items-center">
             <div className="text-8xl p-4 bg-pink-50 rounded-2xl">🤕</div>
             <div className="flex-1">
               <p className="font-bold text-2xl mb-4 text-pink-900">「這個健身器不能用了，真麻煩！」</p>
               <p className="text-pink-800 font-medium bg-pink-50 p-4 rounded-xl border border-pink-200">
                 你遇過類似的問題嗎？找找設施損壞的原因，想想在使用時該注意什麼。
               </p>
             </div>
          </div>
          <button 
            onClick={() => toggleAnswer('s3')}
            className="mt-6 text-xl bg-pink-200 text-pink-900 rounded-xl px-4 py-3 hover:bg-pink-300 block w-full text-center font-bold transition-colors"
          >
            {showAnswer['s3'] ? '🙈 收起參考答案' : '✨ 看看參考答案'}
          </button>
          {showAnswer['s3'] && (
             <div className="mt-4 p-5 bg-pink-50 rounded-xl border-l-4 border-pink-400 text-pink-900 text-lg animate-fade-in">
               <span className="font-bold bg-pink-200 px-2 py-1 rounded mr-2 text-sm">參考答案</span>
               可能是有人使用太大力，或是沒有愛惜。我們使用時要輕一點，按照正確的方法使用，不要破壞它。
             </div>
          )}
        </RetroCard>
      </div>

      <div className="mt-12 text-center p-8 border-2 border-dashed border-sky-300 rounded-3xl bg-white/50">
        <h3 className="text-3xl font-bold text-sky-800 mb-4">🤔 思考時間</h3>
        <p className="text-2xl text-sky-900">對這些現象，你會作出怎樣的評價呢？<br/>參加活動時，你還遇到過哪些情況，有甚麼感受呢？</p>
        <div className="flex justify-center gap-8 mt-8">
           <Smile className="text-green-500 w-20 h-20 hover:scale-110 transition-transform cursor-pointer"/>
           <Frown className="text-red-500 w-20 h-20 hover:scale-110 transition-transform cursor-pointer"/>
        </div>
      </div>
    </div>
  );

  const renderStory = () => (
    <div className="space-y-10 max-w-6xl mx-auto pb-28 animate-fade-in">
       <header className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 inline-block bg-white px-8 py-6 rounded-3xl shadow-lg">
           📖 故事屋：圖書館中的小風波
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story Content - Full Text */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-10 rounded-3xl shadow-lg border border-sky-100 text-xl md:text-2xl leading-loose text-gray-800 font-medium">
             <p className="mb-6 indent-12">
               放學後，<span className="text-blue-600 font-bold bg-blue-50 px-1 rounded">浩恩</span>和<span className="text-green-600 font-bold bg-green-50 px-1 rounded">曉輝</span>一起相約去圖書館做閱讀報告。剛坐了一會兒，就看見不遠處進來三位學生，他們邊走邊大聲說話。坐下後，他們大動作地挪動桌椅，發出很大的聲音 📢。
             </p>
             <p className="mb-6 indent-12">
               噪聲影響到了正在看書的浩恩，浩恩示意保持安靜 🤫。圖書館管理員看到後，立刻上前提醒並勸阻他們。
             </p>
             <p className="mb-6 indent-12">
               曉輝看到一本關於昆蟲小百科的圖書，便開始興奮地讀起來。當他看到一張蝴蝶照片時，覺得好美 🦋，於是決定以蝴蝶為閱讀報告的主題。曉輝一邊思考，一邊就開始在書上動筆畫了起來 ✏️。
             </p>
             <p className="mb-6 indent-12">
               過了一會兒，曉輝開始不耐煩了，覺得自己畫來畫去都不像。此時，他又想起老師說過畫畫和貼圖都可以。於是，他環視了一下圖書館的四周，看見管理員不在，便從背包中拿出了一把小剪刀，裁剪了起來 ✂️。
             </p>
             <p className="mb-6 indent-12">
               浩恩看到了這一幕，立刻上前阻止，可是曉輝已經剪了一半。浩恩氣憤地說：「<span className="text-red-500 font-bold bg-red-50 px-1 rounded">你怎麼能剪這本書呢？這是公共圖書，你沒有權利破壞它的！</span>」😡
             </p>
             <p className="indent-12">
               曉輝有些不好意思了 😳。他向管理員認了錯，並答應儘快賠還一本相同的圖書。他們離開圖書館前，還幫圖書館的老師將擺放得不整齊的椅子歸位。
             </p>
           </div>
           
           <RetroCard title="思考問題" icon="🧠" color="blue">
             <div className="p-4">
                <ul className="list-decimal pl-8 space-y-4 font-bold text-2xl text-sky-900">
                    <li>你從浩恩和曉輝的行為學到了甚麼？</li>
                    <li>文中這些人的言行有哪些不妥？</li>
                </ul>

                <button 
                  onClick={() => setShowStoryAnswers(!showStoryAnswers)}
                  className="mt-8 text-xl bg-sky-200 text-sky-900 rounded-xl px-4 py-3 hover:bg-sky-300 block w-full text-center font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <HelpCircle /> {showStoryAnswers ? '隱藏參考答案' : '顯示參考答案'}
                </button>

                {showStoryAnswers && (
                  <div className="mt-6 bg-sky-50 rounded-xl p-6 border border-sky-200 animate-fade-in">
                    <div className="mb-6">
                      <h4 className="font-bold text-xl text-sky-800 mb-2">💡 參考答案一：</h4>
                      <p className="text-lg text-sky-900 leading-relaxed">
                        我們要像浩恩一樣勇敢，看到不對的事情要指出來；也要像曉輝一樣，做錯事了要勇於認錯並改正，還要愛護公物。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-sky-800 mb-2">💡 參考答案二：</h4>
                      <p className="text-lg text-sky-900 leading-relaxed">
                        1. 進來的學生大聲說話、挪動桌椅發出噪音。<br/>
                        2. 曉輝在圖書館的書上亂畫，甚至還剪書。
                      </p>
                    </div>
                  </div>
                )}
             </div>
           </RetroCard>
        </div>

        {/* AI Chat Bot */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-indigo-100 rounded-3xl p-4 sticky top-6 h-[700px] flex flex-col shadow-xl">
             <div className="flex items-center gap-3 border-b border-indigo-100 pb-4 mb-4 bg-indigo-50 -mx-4 -mt-4 p-4 rounded-t-3xl">
               <div className="bg-white rounded-full p-2 text-4xl shadow-sm">🦉</div>
               <div>
                 <h4 className="font-bold text-2xl text-indigo-900">智慧貓頭鷹老師</h4>
                 <p className="text-base text-indigo-600 font-medium">跟我聊聊你的想法！</p>
               </div>
             </div>

             <div className="flex-1 overflow-y-auto p-4 bg-indigo-50/50 rounded-2xl mb-4 space-y-4">
               <div className="flex justify-start">
                 <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-lg text-indigo-900 font-medium max-w-[95%] border border-indigo-100">
                   小朋友，看完故事了嗎？浩恩阻止了曉輝剪書，如果是你，你會怎麼做呢？
                 </div>
               </div>
               {storyResponse && (
                 <div className="flex justify-start animate-fade-in">
                   <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-lg text-indigo-900 font-medium max-w-[95%] border border-indigo-100">
                     {storyResponse}
                   </div>
                 </div>
               )}
               {loadingStory && (
                  <div className="text-lg text-center text-indigo-400 font-bold animate-pulse">老師正在思考... 🤔</div>
               )}
             </div>

             {/* Quick Reply Options */}
             <div className="mb-3">
               <p className="text-sm font-bold text-indigo-800 mb-2">💡 點擊發送想法：</p>
               <div className="flex flex-wrap gap-2">
                 {storyQuickReplies.map((reply, idx) => (
                   <button 
                     key={idx}
                     onClick={() => handleStoryChat(reply)}
                     disabled={loadingStory}
                     className="bg-white border border-indigo-200 rounded-xl px-3 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-100 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                   >
                     {reply}
                   </button>
                 ))}
               </div>
             </div>

             <div className="flex flex-col gap-3">
               <textarea 
                 value={storyInput}
                 onChange={(e) => setStoryInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleStoryChat()}
                 placeholder="輸入你的想法..."
                 className="flex-1 border-2 border-indigo-100 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-indigo-300 resize-none h-20 font-medium"
               />
               <button 
                 onClick={() => handleStoryChat()}
                 disabled={loadingStory}
                 className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-xl px-4 py-3 transition-colors disabled:opacity-50 shadow-md active:scale-95"
               >
                 送出
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-10 px-4 md:px-8 pb-4">
      <div className="max-w-7xl mx-auto">
        {page === Page.INTRO && renderIntro()}
        {page === Page.COMMUNITY_PLACES && renderPlaces()}
        {page === Page.SOCIAL_OBSERVATION && renderObservation()}
        {page === Page.PUBLIC_MORALITY && renderMorality()}
        {page === Page.STORY_TIME && renderStory()}
      </div>

      <Navigation currentPage={page} setPage={setPage} />
    </div>
  );
};

export default App;