import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkshopManager } from './WorkshopManager';
import { EducatorManager } from './EducatorManager';
import { PostManager } from './PostManager';
import { FaqManager } from './FaqManager';
import { PartnerManager } from './PartnerManager';

export const ContentManagement = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gestione Contenuti</h2>
      
      <Tabs defaultValue="workshops" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="workshops">Workshop</TabsTrigger>
          <TabsTrigger value="educators">Educatori</TabsTrigger>
          <TabsTrigger value="posts">Post</TabsTrigger>
          <TabsTrigger value="faqs">FAQ</TabsTrigger>
          <TabsTrigger value="partners">Partner</TabsTrigger>
        </TabsList>

        <TabsContent value="workshops">
          <WorkshopManager />
        </TabsContent>

        <TabsContent value="educators">
          <EducatorManager />
        </TabsContent>

        <TabsContent value="posts">
          <PostManager />
        </TabsContent>

        <TabsContent value="faqs">
          <FaqManager />
        </TabsContent>

        <TabsContent value="partners">
          <PartnerManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
