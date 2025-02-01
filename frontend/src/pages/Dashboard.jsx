import { RecipeSection } from "../components/dashboard/RecipeSection";
import { ChallengeSection } from "../components/dashboard/ChallengeSection";
import useAuthStore from "../store/authStore";
import { ChallengeSubmission } from "../components/dashboard/ChallengeSubmission";
import { SubmissionCard } from "../components/dashboard/SubmissionCard";

export function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome back, {user.name}!
          </h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                AI-Generated Recipes
              </h2>
              <RecipeSection />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Weekly Challenge
              </h2>
              <ChallengeSection />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
