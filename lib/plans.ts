export const PLANS = {
  free: {
    name: 'Free',
    surveys: 3,
    responsesPerMonth: 50,
    seats: 1,
    aiInsights: false,
    team: false,
    priceMonthlyNgn: 0,
    priceYearlyNgn: 0,
  },
  pro: {
    name: 'Pro',
    surveys: 50,
    responsesPerMonth: 2000,
    seats: 1,
    aiInsights: true,
    team: false,
    priceMonthlyNgn: 5000,
    priceYearlyNgn: 50000,
  },
  team: {
    name: 'Team',
    surveys: Infinity,
    responsesPerMonth: 10000,
    seats: 5,
    aiInsights: true,
    team: true,
    priceMonthlyNgn: 15000,
    priceYearlyNgn: 150000,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export function canUse(plan: PlanId, feature: keyof (typeof PLANS)['free']) {
  return PLANS[plan][feature];
}
