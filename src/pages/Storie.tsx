import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { getPosts } from '@/lib/data/posts';

export default function Storie() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts(true);
        setPosts(data);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Impossibile caricare le storie.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(q) || post.excerpt?.toLowerCase().includes(q);
  });

  return (
    <Layout>
      <SEOHead title="Storie e Approfondimenti - Blog Educazione Ambientale" description="Leggi le storie dei nostri laboratori e approfondimenti scientifici sulle api." keywords="blog api educazione, storie laboratori" />
      <div className="min-h-screen bg-background">
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="outline">Blog & Storie</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Storie di Api e Biodiversità</h1>
              <p className="text-xl text-muted-foreground">Racconti, approfondimenti scientifici e riflessioni</p>
            </div>
          </div>
        </section>
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input type="text" placeholder="Cerca..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12" />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? <div className="text-center py-12"><p className="text-muted-foreground">Caricamento...</p></div> : error ? <div className="text-center py-12"><p className="text-destructive">{error}</p></div> : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-xl transition-all flex flex-col h-full">
                    {post.featured_image_url && <div className="relative aspect-video overflow-hidden bg-muted"><img src={post.featured_image_url} alt={post.featured_image_alt || post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>}
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3"><Calendar className="w-4 h-4" /><time>{new Date(post.published_at).toLocaleDateString('it-IT')}</time></div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
                      {post.excerpt && <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>}
                    </CardHeader>
                    <CardFooter><Button variant="ghost" className="w-full" asChild><a href={`/storie/${post.slug}`}>Leggi l'articolo<ArrowRight className="w-4 h-4 ml-2" /></a></Button></CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}