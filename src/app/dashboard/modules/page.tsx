import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import data from '@../../../lib/data.json';

export default function ModulesPage() {
  const { learningModules } = data;
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">Learning Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningModules.map((module) => (
          <Card key={module.slug} className="bg-slate-800 border-slate-700 text-white flex flex-col">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-slate-400">{module.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}