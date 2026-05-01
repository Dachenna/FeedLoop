'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

type Response = {
  id: string;
  respondent_email: string | null;
  answers: Record<string, unknown>;
  submitted_at: string;
  surveys: { title: string }[];        // This matches what Supabase returns
};

interface ResponsesListProps {
  initialResponses: Response[];
}

export default function ResponsesList({ initialResponses }: ResponsesListProps) {
  const [responses, setResponses] = useState(initialResponses);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);

  // When user clicks "View Details"
  const openModal = (response: Response) => {
    setSelectedResponse(response);        // Save the whole object in state
  };

  const closeModal = () => {
    setSelectedResponse(null);
  };

  const deleteResponse = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('responses').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete response:', error);
      toast.error('Failed to delete response');
    } else {
      setResponses(responses.filter(r => r.id !== id));
      setSelectedResponse(null);
      toast.success('Response deleted successfully');
    }
  };

  return (
    <>
      {/* List of response cards */}
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">All Responses</h1>

        {responses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {responses.map((response) => (
              <Card key={response.id}>
                <CardHeader>
                  <CardTitle>{response.surveys[0]?.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Respondent: {response.respondent_email || 'Anonymous'}</p>
                  <p>Submitted: {new Date(response.submitted_at).toLocaleString()}</p>
                  <Badge className='border border-white/90 mr-3 rounded-sm p-1'>{Object.keys(response.answers).length} answers</Badge>

                  <Button onClick={() => openModal(response)} variant='outline' className="p-3  ">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No responses yet</p>
        )}
      </div>

      {/* Modal - This is what shows when you click View */}
      {selectedResponse && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">{selectedResponse.surveys[0]?.title}</h2>
              <p className="text-sm text-gray-500">
                Submitted {new Date(selectedResponse.submitted_at).toLocaleString()}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {Object.entries(selectedResponse.answers).map(([key, answer]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border">
                  <div className="font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">
                    Question {parseInt(key) + 1}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    {String(answer)}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t flex justify-between">
              <Button onClick={() => deleteResponse(selectedResponse.id)} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Response
              </Button>
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}