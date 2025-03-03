export default {
  requiring_docs: 'Requiring documents',
  available_benefits: 'Available benefits',
  maturity_amount: 'Approximate saving (Maturity Amount)',
  IC_strategy: 'Based on the Default Company Strategy',
  applicant_strategy: 'Based on applicant strategy choice',
  contribution: 'contribution',
  insurance_period: 'Insurance Period',
  sum_covered: 'Sum Covered',
  select_quotation: 'Select Quotation',
  view_illustrations: 'View Illustrations',
  view_brochure: 'View Brochure',
  request_date: 'Request Date',
  view_quotes: 'View Quotes',
  previous_quotes: 'Previous Quotes',

  no_data: {
    no_quotes_title: 'There are no quotes to be shown',
    no_quotes_description: 'Please try again',
    no_quotes_action: 'Try Again',
  },
  questions: {
    quote_ques_title: 'Important to know before proceeding!',
    quote_ques_desc: 'You can access this advice using the below link:',
    quote_ques_title_1: 'What is maturity amount? and why is it approximate? ',
    quote_ques_desc_1:
      'The maturity amount of the policy is the expected amount to be available in your investment account at the end of the insurance period. This is an approximate value and does not necessarily guarantee reaching this amount, as it will depend on the future performance of investment funds. The final value may be the same, higher, or lower. Therefore, these figures are for illustrative purposes only. 	',
    quote_ques_title_2: 'What is an investment strategy?',
    quote_ques_desc_2:
      'It is the strategy that will be used to invest the contribution amount, and it can be high-risk, medium-risk, or low-risk, with each strategy containing a set of investment funds, allowing you to choose from the funds associated with the desired strategy	',
    quote_ques_title_3:
      '	Will the whole of my contribution be used for investment?',
    quote_ques_desc_3:
      'A portion of the contribution amount is deducted for administrative and insurance expenses to provide protection and manage investment funds, while the remaining amount is deposited into your investment account.	',
    quote_ques_title_4: 'What is the Sum Covered? ',
    quote_ques_desc_4:
      'The Sum Covered is the amount due in the event of death. Depending on the product you will purchase, it determines how the accrued value will be used in the event of the death of the covered person. In investment and retirement products, upon death, the beneficiaries receive the amount in the investment account or the protection amount, whichever is higher. In products for children (education or marriage), the insurance company pays the subscription value until the end of the policy through the protection amount. So the beneficiary receives the value of the policy maturity at the end of the insurance period without being affected by the death of the covered person.',
    quote_ques_title_5: 'What is the Illustration file? ',
    quote_ques_desc_5:
      'It is a file containing an explanation of how your investment is expected to grow during the term of the policy. It shows for each year of the policy the value of the deducted expenses, the expected value of your investment account in that year, and the recovery value if you cancel the policy during any of its years. According to the rules regulating the Central Bank, the explanation must contain an explanation of the investment at the expected values based on growth rates of 3%, 5%, and 7%. Please note that these are just illustrative values only. But it is impossible to predict what will happen in the future as any investment has risks.',
  },
  saving_plan: {
    re_quote: 'Re-Quote',
    Company_Details: 'My Goal',
    tooltip_content:
      'The savings plan you selected at the beginning of the application',
    edit_plan: 'Edit my saving plan',
  },
  insurance_options: {
    insurance_options: 'Insurance Options ',
    sum_covered: 'Sum Covered',
    sum_covered_tooltip:
      "The sum covered is the amount paid to the beneficiaries in the event of the covered member's death",
    as_per_quotation: 'As per Each Quotation',
    customized_amount: 'Customized Amount',
    enter_customized_amount: 'Enter Customized Amount',
    death_benefits_option: 'Death Benefit Option',
    death_benefits_tooltip:
      'The amount that the beneficiary will receive in the event of the death of the covered member',

    failed_to_load: 'Failed to load the death benefit options',
  },
  strategies: {
    heading: 'Select Strategies',
    save_strategy: 'Save Strategy',
    strategy_hint: 'You can select at least one fund from below',
    enter_percentage: 'Enter percentage',
    view_performance: 'View Performance',
    percentage_error: 'The sum of the percentage has to equal 100%',
  },
  health_related_questions: {
    warning_alert_text:
      "Answering 'yes' to any of the questions on this page requires a review by an insurance company employee and may require medical report. This is currently not supported from the website. Please contact the insurance company to obtain a quotation.",
    error_alert_text:
      'We cannot proceed with your request, please check your answers.',
    questions_section_title: 'Declaration',
    consent_text:
      'All health declarations are correct and I understand that any wrong answer will affect the policy',
  },
  illustrations: {
    illustration_tables: 'Illustration Tables',
    year: 'Year',
    cumulativePremium: 'Cumulative Premium',
    projectedInvestmentValue: 'Projected Investment Value',
    projectedDeathBenefit: 'Projected Death Benefit',
    projectedSurrenderValue: 'Projected Surrender Value',
    growth_rate_of: 'Growth Rate of',
    totalCharges: 'Total Charges',
    illustrations_of_investment_title: 'Illustration of Investment',
    illustrations_of_investment_description:
      'The Values Illustrated are based on assumptions as shown on this Illustration. If any of the assumptions made changes or do not happen at any time, the illustrated values shown here will change accordingly. The rates of return are illustration purpose only, and are in no way guaranteed by the Insurance Company. The final value will depend on the future performance of the underlying investment fund(s) as well as other factors such as exchange rate movements.',
    illustrations_of_charges_title: 'Illustration of Charges',
  },
  quote_expires_after: 'Quotations Expires after:',
  quote_time_is_out: 'Quote time is out',
  quote_expired: 'Your requested quotation list is expired',
  try_again: 'Try again to generate quotations',
  generate_quote_list: 'Generate Quote List',
  quotes_loading_text: 'We’re bringing suitable quotations for you',
  please_wait: 'please wait',
  save_and_view_illustration: 'Save and View Illustration',
  sum_covered_changes:
    'Sum Covered is returned based on the Insurance Company based on your nearest preference',

  failed_to_load_quote_details: 'Failed to load the quote details',
  failed_to_load_strategies: 'Failed to load strategies',
  share: {
    share_quotation: 'Share Quotation',
    share_description: 'You can access this Quotation using the below link',
    share_mobile: 'Share Mobile',
    share_email: 'Share Email',
    copy_link: 'Copy Link',
  },
} as const
