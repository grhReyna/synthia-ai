import { fetchPromptsFromSheet } from '@/lib/fetchPrompts';
import PromptGallery from '@/components/PromptGallery';
import PromptsHeader from '@/components/PromptsHeader';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Prompts - Synthia AI',
  description: 'Epic prompt gallery for legendary universes',
};

export default async function PromptsPage() {
  const prompts = await fetchPromptsFromSheet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header with Banner Background */}
      <div className="relative w-full py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/banner.png)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 via-pink-800/30 to-purple-900/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PromptsHeader count={prompts.length} />
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {prompts.length > 0 ? (
          <PromptGallery prompts={prompts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">⏳</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
