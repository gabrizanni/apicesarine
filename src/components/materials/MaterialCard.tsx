import React from 'react';
import { Download, FileText, Video, Archive, Monitor, Eye } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Material } from '@/hooks/useMaterials';

interface MaterialCardProps {
  material: Material;
  onDownload: (materialId: string) => void;
  isLocked?: boolean;
}

const MaterialCard = ({ material, onDownload, isLocked = false }: MaterialCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return FileText;
      case 'video':
        return Video;
      case 'zip':
      case 'pacchetto':
        return Archive;
      case 'software':
        return Monitor;
      default:
        return FileText;
    }
  };

  const Icon = getTypeIcon(material.file_type);

  const handleDownload = () => {
    if (!isLocked) {
      onDownload(material.id);
    }
  };

  return (
    <Card className={`shadow-card border-0 hover:shadow-lg transition-smooth group relative ${isLocked ? 'opacity-75' : ''}`}>
      {isLocked && (
        <div className="absolute inset-0 bg-slate/5 flex items-center justify-center z-10 rounded-lg">
          <div className="text-center">
            <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Contenuto riservato</p>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className={`p-3 bg-gradient-honey rounded-xl transition-smooth ${!isLocked ? 'group-hover:shadow-honey' : ''}`}>
            <Icon className="h-6 w-6 text-slate" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-slate mb-2">
              {material.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {material.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              {material.file_type}
            </Badge>
            {material.file_size && (
              <span className="text-muted-foreground">
                {material.file_size}
              </span>
            )}
          </div>
          {material.target_age_group && (
            <Badge variant="secondary" className="text-xs">
              {material.target_age_group}
            </Badge>
          )}
        </div>

        {/* Tags */}
        {material.tags && material.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {material.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 bg-muted text-xs rounded-lg text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {material.tags.length > 3 && (
              <span className="inline-block px-2 py-1 bg-muted text-xs rounded-lg text-muted-foreground">
                +{material.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Download button and counter */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {material.download_count} download
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleDownload}
            disabled={isLocked}
            className={!isLocked ? "group-hover:bg-accent transition-smooth" : ""}
          >
            <Download className="h-4 w-4 mr-2" />
            Scarica
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;