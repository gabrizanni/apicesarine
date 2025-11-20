import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/common/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getGalleryItems } from '@/lib/data/gallery';

type Category = 'Tutti' | 'Laboratori' | 'Natura' | 'Tutorial';

const categories: Category[] = ['Tutti', 'Laboratori', 'Natura', 'Tutorial'];

export default function Galleria() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Tutti');

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await getGalleryItems(selectedCategory);
        setItems(data);
      } catch (err) {
        console.error('Error loading gallery items:', err);
        setError('Impossibile caricare la galleria. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedCategory]);

  return (
    <Layout>
      <SEOHead 
        title="Galleria Fotografica - I Nostri Laboratori in Azione"
        description="Scopri le immagini dei nostri laboratori didattici sulle api: workshop in aula, attività pratiche, natura e biodiversità."
        keywords={["galleria foto laboratori api", "workshop didattici immagini", "educazione ambientale foto"]}
      />

      <div className="min-h-screen bg-background">
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="outline" className="mb-4">Esperienze Visive</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Galleria
              </h1>
              <p className="text-xl text-muted-foreground">
                Scopri i momenti più significativi dei nostri laboratori
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/90 transition-colors px-6 py-2"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12"><p className="text-muted-foreground">Caricamento...</p></div>
            ) : error ? (
              <div className="text-center py-12"><p className="text-destructive">{error}</p></div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {items.map((item) => (
                  <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img src={item.image_url} alt={item.image_alt || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      {item.description && <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>}
                    </CardContent>
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