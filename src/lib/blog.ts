export type BlogPost = {
    slug: string
    title: string
    description: string
    content: string
    author: {
      name: string
      role: string
    }
    publishedAt: string
    updatedAt?: string
    readingTime: number
    tags: string[]
    locale: 'en' | 'tr'
  }
  
  export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const words = textContent.split(/\s+/).filter((word) => word.length > 0).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return Math.max(1, minutes)
  }
  
  export function getBlogPosts(locale: 'en' | 'tr'): BlogPost[] {
    return blogPosts.filter((post) => post.locale === locale)
  }
  
  export function getBlogPost(slug: string, locale: 'en' | 'tr'): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug && post.locale === locale)
  }
  
  export function getAllBlogSlugs(): Array<{ slug: string; locale: 'en' | 'tr' }> {
    return blogPosts.map((post) => ({
      slug: post.slug,
      locale: post.locale
    }))
  }
  
  const blogPosts: BlogPost[] = [
    {
      slug: 'tabuu-vs-tadado',
      locale: 'en' as const, 
      title: 'Tabuu vs Tadado: The Evolution of Word Games',
      description: 'Discover how Tadado revolutionizes the classic Taboo game with AI-powered cards, personalized categories, and a modern mobile experience. Learn why Tadado is the future of word games.',
      content: `
        <p class="lead">Word games have been a favorite pastime for generations, bringing friends and families together for hours of fun and laughter. The classic game of Taboo has been a staple at parties and gatherings for decades. But what if we told you there's a better way to play?</p>
  
        <h2>What is Traditional Taboo?</h2>
        
        <p>Traditional Taboo is a word-guessing party game where players try to get their teammates to guess a word without using a list of forbidden "taboo" words. Players draw cards with a target word and must describe it using any words except those listed on the card.</p>
        
        <p>While Taboo has provided countless hours of entertainment, it has its limitations. Players are restricted to a fixed deck of cards, meaning games can become repetitive. The physical cards can get lost or damaged, and you need to be in the same room with all players to enjoy the game.</p>
  
        <h2>Introducing Tadado</h2>
        
        <p>Tadado takes the core concept of Taboo and elevates it to a whole new level. We've reimagined the word-guessing experience by combining modern technology with engaging gameplay. Tadado offers AI-powered card generation, personalized categories, and a seamless mobile experience that brings the fun anywhere, anytime.</p>
  
        <h2>Key Differences</h2>
  
        <h3>AI-Powered Card Generation</h3>
        
        <p>Unlike traditional Taboo with its fixed deck, Tadado uses artificial intelligence to generate an endless variety of word cards. Every game feels fresh and unique. The AI creates challenging word combinations that keep players on their toes, ensuring that no two games are ever the same.</p>
        
        <p>This means you'll never run out of content. Whether you've played ten games or a thousand, Tadado continues to surprise and challenge you with new word combinations tailored to your preferences.</p>
  
        <h3>Personalized Categories</h3>
        
        <p>Traditional Taboo offers generic categories that may not appeal to everyone. Tadado changes this by allowing you to choose from a wide range of personalized categories. Whether you're into technology, sports, movies, history, or niche topics, Tadado has something for everyone.</p>
        
        <p>You can even customize categories based on your friend group's interests, making each game session more relevant and engaging. This personalization ensures that every player can contribute meaningfully to the game.</p>
  
        <h3>Modern Mobile Experience</h3>
        
        <p>Taboo requires physical cards and a playing surface, limiting where and when you can play. Tadado is entirely mobile-based, meaning you can start a game anywhere—whether you're at a coffee shop, on a road trip, or at a party. All you need is your smartphone.</p>
        
        <p>Our intuitive interface makes it easy to play with friends near or far. The app handles scoring, timing, and card management automatically, so you can focus on having fun and making memories.</p>
  
        <h3>No Physical Cards Needed</h3>
        
        <p>Say goodbye to lost cards, damaged decks, and the hassle of setting up physical game components. Tadado eliminates all of this by digitizing the entire experience. Your game collection is always with you, stored safely in your phone.</p>
        
        <p>This also means better accessibility. Players who may have difficulty handling small cards or reading fine print can enjoy Tadado's clear, customizable interface that adapts to their needs.</p>
  
        <h2>Why Tadado is the Future</h2>
        
        <p>Tadado represents the evolution of party games. By combining the time-tested fun of word-guessing games with cutting-edge AI technology, we've created an experience that's both familiar and revolutionary.</p>
        
        <p>The benefits are clear: endless content variety, personalized experiences, portability, and accessibility. As we move into an increasingly digital world, Tadado offers a bridge between classic gameplay and modern convenience.</p>
        
        <p>While traditional Taboo will always have its nostalgic charm, Tadado provides a forward-thinking alternative that meets the needs of today's players. It's not just a game—it's the next generation of word-guessing entertainment.</p>
  
        <h2>Get Started with Tadado</h2>
        
        <p>Ready to experience the evolution of word games? Tadado is coming soon to iOS, with Android support following shortly after. Join our waitlist to be among the first to play and discover why thousands of players are already excited about this modern take on a classic favorite.</p>
        
        <p>Whether you're a longtime Taboo fan looking for something fresh or a newcomer to word games, Tadado offers an experience that's both familiar and excitingly new. Download the app today and see what all the buzz is about!</p>
      `,
      author: {
        name: 'Tadado Team',
        role: 'Game Developers'
      },
      publishedAt: '2026-01-10T10:00:00Z',
      readingTime: 5,
      tags: ['word games', 'AI', 'mobile games', 'party games', 'Taboo']
    },
    {
      slug: 'tabuu-vs-tadado',
      locale: 'tr' as const, 
      title: 'Tabuu vs Tadado: Kelime Oyunlarının Evrimi',
      description: 'Tadado\'nun AI destekli kartlar, kişiselleştirilmiş kategoriler ve modern mobil deneyimle klasik Taboo oyununu nasıl devrim niteliğinde bir hale getirdiğini keşfedin. Tadado\'nun neden kelime oyunlarının geleceği olduğunu öğrenin.',
      content: `
        <p class="lead">Kelime oyunları nesiller boyu favori eğlence kaynağı olmuş, arkadaşları ve aileleri saatlerce eğlence ve kahkaha için bir araya getirmiştir. Klasik Tabuu oyunu, onlarca yıldır partiler ve buluşmalarda temel bir oyun olmuştur. Ama size daha iyi bir oynama yolu olduğunu söylesek?</p>
  
        <h2>Geleneksel Tabuu Nedir?</h2>
        
        <p>Geleneksel Tabuu, oyuncuların takım arkadaşlarının bir kelimeyi tahmin etmeye çalıştığı, yasak "tabu" kelimelerin listesini kullanmadan bir kelime tahmin etme partisi oyunudur. Oyuncular hedef kelime olan kartları çeker ve kartta listelenen kelimeler dışında herhangi bir kelime kullanarak onu tanımlamalıdır.</p>
        
        <p>Tabuu sayısız saat eğlence sağlarken, sınırlamaları da vardır. Oyuncular sabit bir kart destesine kısıtlıdır, bu da oyunların tekrarlayıcı hale gelebileceği anlamına gelir. Fiziksel kartlar kaybolabilir veya hasar görebilir ve oyunun tadını çıkarmak için tüm oyuncularla aynı odada olmanız gerekir.</p>
  
        <h2>Tadado'yu Tanıyalım</h2>
        
        <p>Tadado, Tabuu'nun temel konseptini alır ve onu tamamen yeni bir seviyeye taşır. Modern teknolojiyi ilgi çekici oyun mekaniğiyle birleştirerek kelime tahmin deneyimini yeniden tasarladık. Tadado, AI destekli kart üretimi, kişiselleştirilmiş kategoriler ve eğlenceyi her yere, her zaman getiren sorunsuz bir mobil deneyim sunar.</p>
  
        <h2>Temel Farklılıklar</h2>
  
        <h3>AI Destekli Kart Üretimi</h3>
        
        <p>Sabit desteli geleneksel Tabuu'nun aksine, Tadado sonsuz çeşitlilikte kelime kartı üretmek için yapay zeka kullanır. Her oyun taze ve benzersiz hisseder. AI, oyuncuları ayak parmaklarında tutan zorlu kelime kombinasyonları oluşturur ve hiçbir iki oyunun asla aynı olmamasını sağlar.</p>
        
        <p>Bu, içeriğinizin hiçbir zaman tükenmeyeceği anlamına gelir. İster on oyun ister bin oyun oynamış olun, Tadado tercihlerinize göre özelleştirilmiş yeni kelime kombinasyonlarıyla sizi şaşırtmaya ve meydan okumaya devam eder.</p>
  
        <h3>Kişiselleştirilmiş Kategoriler</h3>
        
        <p>Geleneksel Tabuu, herkese hitap etmeyebilecek genel kategoriler sunar. Tadado bunu, geniş bir kişiselleştirilmiş kategori yelpazesinden seçim yapmanıza izin vererek değiştirir. İster teknoloji, spor, film, tarih veya niş konularla ilgilenin, Tadado herkes için bir şeyler sunar.</p>
        
        <p>Hatta arkadaş grubunuzun ilgi alanlarına göre kategorileri özelleştirebilir, böylece her oyun oturumunu daha alakalı ve ilgi çekici hale getirebilirsiniz. Bu kişiselleştirme, her oyuncunun oyuna anlamlı bir şekilde katkıda bulunmasını sağlar.</p>
  
        <h3>Modern Mobil Deneyim</h3>
        
        <p>Tabuu fiziksel kartlar ve bir oyun yüzeyi gerektirir, nerede ve ne zaman oynayabileceğinizi sınırlar. Tadado tamamen mobil tabanlıdır, yani bir kahve dükkanında, bir yolculukta veya bir partide olsanız bile her yerde bir oyun başlatabilirsiniz. Tek ihtiyacınız olan akıllı telefonunuz.</p>
        
        <p>Sezgisel arayüzümüz, yakında veya uzakta arkadaşlarla oynamayı kolaylaştırır. Uygulama skoru, zamanlamayı ve kart yönetimini otomatik olarak halleder, böylece eğlenmeye ve anılar yaratmaya odaklanabilirsiniz.</p>
  
        <h3>Fiziksel Karta İhtiyaç Yok</h3>
        
        <p>Kayıp kartlara, hasarlı destelere ve fiziksel oyun bileşenlerini kurma zahmetine veda edin. Tadado tüm deneyimi dijitalleştirerek bunların hepsini ortadan kaldırır. Oyun koleksiyonunuz her zaman yanınızdadır, telefonunuzda güvenle saklanır.</p>
        
        <p>Bu aynı zamanda daha iyi erişilebilirlik anlamına gelir. Küçük kartları tutmakta veya ince yazıları okumakta zorluk çeken oyuncular, ihtiyaçlarına uyum sağlayan Tadado'nun net, özelleştirilebilir arayüzünden keyif alabilirler.</p>
  
        <h2>Tadado Neden Gelecek?</h2>
        
        <p>Tadado, parti oyunlarının evrimini temsil eder. Kelime tahmin oyunlarının zaman testi yapılmış eğlencesini en son AI teknolojisiyle birleştirerek, hem tanıdık hem de devrim niteliğinde bir deneyim yarattık.</p>
        
        <p>Faydalar açıktır: sonsuz içerik çeşitliliği, kişiselleştirilmiş deneyimler, taşınabilirlik ve erişilebilirlik. Giderek dijitalleşen bir dünyaya geçerken, Tadado klasik oyun mekaniği ile modern kolaylık arasında bir köprü sunar.</p>
        
        <p>Geleneksel Tabuu her zaman nostaljik çekiciliğine sahip olacak olsa da, Tadado bugünün oyuncularının ihtiyaçlarını karşılayan ileri görüşlü bir alternatif sunar. Bu sadece bir oyun değil—kelime tahmin eğlencesinin yeni neslidir.</p>
  
        <h2>Tadado ile Başlayın</h2>
        
        <p>Kelime oyunlarının evrimini deneyimlemeye hazır mısınız? Tadado yakında iOS'ta, kısa süre sonra Android desteği ile gelecek. İlk oynayanlar arasında olmak için bekleme listemize katılın ve binlerce oyuncunun neden bu klasik favorinin modern yorumuna çoktan heyecanlandığını keşfedin.</p>
        
        <p>İster taze bir şeyler arayan uzun süredir Tabuu hayranı olun, ister kelime oyunlarına yeni başlayan biri olun, Tadado hem tanıdık hem de heyecan verici şekilde yeni bir deneyim sunar. Uygulamayı bugün indirin ve tüm bu heyecanın ne hakkında olduğunu görün!</p>
      `,
      author: {
        name: 'Tadado Ekibi',
        role: 'Oyun Geliştiricileri'
      },
      publishedAt: '2026-01-10T10:00:00Z',
      readingTime: 5,
      tags: ['kelime oyunları', 'yapay zeka', 'mobil oyunlar', 'parti oyunları', 'Tabuu']
    }
  ].map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content)
  }))