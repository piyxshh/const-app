'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import data from '@../../../lib/data.json';

export default function CoachPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredQuestions = data.coachQuestions.filter((item) => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-slate-800 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="text-4xl font-bold bg-gradient-to-b from-green-300 to-blue-400 text-transparent bg-clip-text">
          Constitution Coach
        </CardTitle>
        <CardDescription className="text-slate-400 text-lg pt-2">
          Search for answers to common questions about the Indian Constitution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input 
          type="text"
          placeholder="Search questions..."
          className="mb-6 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="space-y-4">
          {filteredQuestions.map((item) => (
            <div key={item.id} className="border-t border-slate-700 pt-4">
              <h3 className="font-semibold text-lg text-white">{item.question}</h3>
              <p className="text-slate-300 mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}