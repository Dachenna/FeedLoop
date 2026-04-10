'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

type Response = {
  id: string;
  respondent_email: string | null;
  answers: Record<string, any>;     // This is the JSONB object
  submitted_at: string;
  surveys: { title: string };
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
                  <CardTitle>{response.surveys.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Respondent: {response.respondent_email || 'Anonymous'}</p>
                  <p>Submitted: {new Date(response.submitted_at).toLocaleString()}</p>
                  <Badge>{Object.keys(response.answers).length} answers</Badge>

                  <Button onClick={() => openModal(response)} variant="outline">
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
              <h2 className="text-2xl font-bold">{selectedResponse.surveys.title}</h2>
              <p className="text-sm text-gray-500">
                Submitted {new Date(selectedResponse.submitted_at).toLocaleString()}
              </p>
            </div>

            <div className="p-6 space-y-8">
              {Object.entries(selectedResponse.answers).map(([key, answer], index) => (
                <div key={key} className="border-b pb-6 last:border-none">
                  <p className="font-medium mb-1">Question {parseInt(key) + 1}</p>
                  <p className="text-lg">{String(answer)}</p>
                </div>
              ))}
            </div>

            <div className="p-6 border-t flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}