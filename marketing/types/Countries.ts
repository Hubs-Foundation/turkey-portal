export const ACCEPTED_REGION_CODES = [
  'DE',
  'IT',
  'ER',
  'NL',
  'IE',
  'FR',
  'LU',
  'BE',
  'AU',
  'US',
  'GB',
  'CA',
  'CH',
  'NZ',
  'SG',
] as const;
export type AcceptedRegionCodeT = typeof ACCEPTED_REGION_CODES[number];
export type RegionCodeT = AcceptedRegionCodeT | string | null;
export type CurrencyAbbrev =
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'CAD'
  | 'CHF'
  | 'NZD'
  | 'SGD';

export type RegionT = {
  regionCode: RegionCodeT;
};

export enum CurrencySymbolMap {
  USD = '$',
  EUR = '€',
  CHF = 'CHF',
  SGD = '$',
  NZD = '$',
  GBP = '£',
  CAD = '$',
}

export const PLAN_ID_MAP = {
  DE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  IT: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  ER: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  NL: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  IE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: ' i love taxes',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.49,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  FR: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  LU: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  BE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  AU: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  US: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: ' + tax',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 20.0,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  GB: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  CA: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  CH: {
    abbrev: 'CHF',
    symbol: 'CHF',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  NZ: {
    abbrev: 'NZD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
  SG: {
    abbrev: 'SGD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
};

export const CountryOptions = [
  { value: 'AF', title: 'Afghanistan' },
  { value: 'AX', title: 'Aland Islands' },
  { value: 'AL', title: 'Albania' },
  { value: 'DZ', title: 'Algeria' },
  { value: 'AS', title: 'American Samoa' },
  { value: 'AD', title: 'Andorra' },
  { value: 'AO', title: 'Angola' },
  { value: 'AI', title: 'Anguilla' },
  { value: 'AQ', title: 'Antarctica' },
  { value: 'AG', title: 'Antigua and Barbuda' },
  { value: 'AR', title: 'Argentina' },
  { value: 'AM', title: 'Armenia' },
  { value: 'AW', title: 'Aruba' },
  { value: 'AU', title: 'Australia' },
  { value: 'AT', title: 'Austria' },
  { value: 'AZ', title: 'Azerbaijan' },
  { value: 'BS', title: 'Bahamas' },
  { value: 'BH', title: 'Bahrain' },
  { value: 'BD', title: 'Bangladesh' },
  { value: 'BB', title: 'Barbados' },
  { value: 'BY', title: 'Belarus' },
  { value: 'BE', title: 'Belgium' },
  { value: 'BZ', title: 'Belize' },
  { value: 'BJ', title: 'Benin' },
  { value: 'BM', title: 'Bermuda' },
  { value: 'BT', title: 'Bhutan' },
  { value: 'BO', title: 'Bolivia' },
  { value: 'BQ', title: 'Bonaire, Sint Eustatius and Saba' },
  { value: 'BA', title: 'Bosnia and Herzegovina' },
  { value: 'BW', title: 'Botswana' },
  { value: 'BV', title: 'Bouvet Island' },
  { value: 'BR', title: 'Brazil' },
  { value: 'IO', title: 'British Indian Ocean Territory' },
  { value: 'BN', title: 'Brunei Darussalam' },
  { value: 'BG', title: 'Bulgaria' },
  { value: 'BF', title: 'Burkina Faso' },
  { value: 'BI', title: 'Burundi' },
  { value: 'KH', title: 'Cambodia' },
  { value: 'CM', title: 'Cameroon' },
  { value: 'CA', title: 'Canada' },
  { value: 'CV', title: 'Cape Verde' },
  { value: 'KY', title: 'Cayman Islands' },
  { value: 'CF', title: 'Central African Republic' },
  { value: 'TD', title: 'Chad' },
  { value: 'CL', title: 'Chile' },
  { value: 'CN', title: 'China' },
  { value: 'CX', title: 'Christmas Island' },
  { value: 'CC', title: 'Cocos (Keeling) Islands' },
  { value: 'CO', title: 'Colombia' },
  { value: 'KM', title: 'Comoros' },
  { value: 'CG', title: 'Congo' },
  { value: 'CD', title: 'Congo, Democratic Republic of the Congo' },
  { value: 'CK', title: 'Cook Islands' },
  { value: 'CR', title: 'Costa Rica' },
  { value: 'CI', title: "Cote D'Ivoire" },
  { value: 'HR', title: 'Croatia' },
  { value: 'CU', title: 'Cuba' },
  { value: 'CW', title: 'Curacao' },
  { value: 'CY', title: 'Cyprus' },
  { value: 'CZ', title: 'Czech Republic' },
  { value: 'DK', title: 'Denmark' },
  { value: 'DJ', title: 'Djibouti' },
  { value: 'DM', title: 'Dominica' },
  { value: 'DO', title: 'Dominican Republic' },
  { value: 'EC', title: 'Ecuador' },
  { value: 'EG', title: 'Egypt' },
  { value: 'SV', title: 'El Salvador' },
  { value: 'GQ', title: 'Equatorial Guinea' },
  { value: 'ER', title: 'Eritrea' },
  { value: 'EE', title: 'Estonia' },
  { value: 'ET', title: 'Ethiopia' },
  { value: 'FK', title: 'Falkland Islands (Malvinas)' },
  { value: 'FO', title: 'Faroe Islands' },
  { value: 'FJ', title: 'Fiji' },
  { value: 'FI', title: 'Finland' },
  { value: 'FR', title: 'France' },
  { value: 'GF', title: 'French Guiana' },
  { value: 'PF', title: 'French Polynesia' },
  { value: 'TF', title: 'French Southern Territories' },
  { value: 'GA', title: 'Gabon' },
  { value: 'GM', title: 'Gambia' },
  { value: 'GE', title: 'Georgia' },
  { value: 'DE', title: 'Germany' },
  { value: 'GH', title: 'Ghana' },
  { value: 'GI', title: 'Gibraltar' },
  { value: 'GR', title: 'Greece' },
  { value: 'GL', title: 'Greenland' },
  { value: 'GD', title: 'Grenada' },
  { value: 'GP', title: 'Guadeloupe' },
  { value: 'GU', title: 'Guam' },
  { value: 'GT', title: 'Guatemala' },
  { value: 'GG', title: 'Guernsey' },
  { value: 'GN', title: 'Guinea' },
  { value: 'GW', title: 'Guinea-Bissau' },
  { value: 'GY', title: 'Guyana' },
  { value: 'HT', title: 'Haiti' },
  { value: 'HM', title: 'Heard Island and Mcdonald Islands' },
  { value: 'VA', title: 'Holy See (Vatican City State)' },
  { value: 'HN', title: 'Honduras' },
  { value: 'HK', title: 'Hong Kong' },
  { value: 'HU', title: 'Hungary' },
  { value: 'IS', title: 'Iceland' },
  { value: 'IN', title: 'India' },
  { value: 'ID', title: 'Indonesia' },
  { value: 'IR', title: 'Iran, Islamic Republic of' },
  { value: 'IQ', title: 'Iraq' },
  { value: 'IE', title: 'Ireland' },
  { value: 'IM', title: 'Isle of Man' },
  { value: 'IL', title: 'Israel' },
  { value: 'IT', title: 'Italy' },
  { value: 'JM', title: 'Jamaica' },
  { value: 'JP', title: 'Japan' },
  { value: 'JE', title: 'Jersey' },
  { value: 'JO', title: 'Jordan' },
  { value: 'KZ', title: 'Kazakhstan' },
  { value: 'KE', title: 'Kenya' },
  { value: 'KI', title: 'Kiribati' },
  { value: 'KP', title: "Korea, Democratic People's Republic of" },
  { value: 'KR', title: 'Korea, Republic of' },
  { value: 'XK', title: 'Kosovo' },
  { value: 'KW', title: 'Kuwait' },
  { value: 'KG', title: 'Kyrgyzstan' },
  { value: 'LA', title: "Lao People's Democratic Republic" },
  { value: 'LV', title: 'Latvia' },
  { value: 'LB', title: 'Lebanon' },
  { value: 'LS', title: 'Lesotho' },
  { value: 'LR', title: 'Liberia' },
  { value: 'LY', title: 'Libyan Arab Jamahiriya' },
  { value: 'LI', title: 'Liechtenstein' },
  { value: 'LT', title: 'Lithuania' },
  { value: 'LU', title: 'Luxembourg' },
  { value: 'MO', title: 'Macao' },
  { value: 'MK', title: 'Macedonia, the Former Yugoslav Republic of' },
  { value: 'MG', title: 'Madagascar' },
  { value: 'MW', title: 'Malawi' },
  { value: 'MY', title: 'Malaysia' },
  { value: 'MV', title: 'Maldives' },
  { value: 'ML', title: 'Mali' },
  { value: 'MT', title: 'Malta' },
  { value: 'MH', title: 'Marshall Islands' },
  { value: 'MQ', title: 'Martinique' },
  { value: 'MR', title: 'Mauritania' },
  { value: 'MU', title: 'Mauritius' },
  { value: 'YT', title: 'Mayotte' },
  { value: 'MX', title: 'Mexico' },
  { value: 'FM', title: 'Micronesia, Federated States of' },
  { value: 'MD', title: 'Moldova, Republic of' },
  { value: 'MC', title: 'Monaco' },
  { value: 'MN', title: 'Mongolia' },
  { value: 'ME', title: 'Montenegro' },
  { value: 'MS', title: 'Montserrat' },
  { value: 'MA', title: 'Morocco' },
  { value: 'MZ', title: 'Mozambique' },
  { value: 'MM', title: 'Myanmar' },
  { value: 'NA', title: 'Namibia' },
  { value: 'NR', title: 'Nauru' },
  { value: 'NP', title: 'Nepal' },
  { value: 'NL', title: 'Netherlands' },
  { value: 'AN', title: 'Netherlands Antilles' },
  { value: 'NC', title: 'New Caledonia' },
  { value: 'NZ', title: 'New Zealand' },
  { value: 'NI', title: 'Nicaragua' },
  { value: 'NE', title: 'Niger' },
  { value: 'NG', title: 'Nigeria' },
  { value: 'NU', title: 'Niue' },
  { value: 'NF', title: 'Norfolk Island' },
  { value: 'MP', title: 'Northern Mariana Islands' },
  { value: 'NO', title: 'Norway' },
  { value: 'OM', title: 'Oman' },
  { value: 'PK', title: 'Pakistan' },
  { value: 'PW', title: 'Palau' },
  { value: 'PS', title: 'Palestinian Territory, Occupied' },
  { value: 'PA', title: 'Panama' },
  { value: 'PG', title: 'Papua New Guinea' },
  { value: 'PY', title: 'Paraguay' },
  { value: 'PE', title: 'Peru' },
  { value: 'PH', title: 'Philippines' },
  { value: 'PN', title: 'Pitcairn' },
  { value: 'PL', title: 'Poland' },
  { value: 'PT', title: 'Portugal' },
  { value: 'PR', title: 'Puerto Rico' },
  { value: 'QA', title: 'Qatar' },
  { value: 'RE', title: 'Reunion' },
  { value: 'RO', title: 'Romania' },
  { value: 'RU', title: 'Russian Federation' },
  { value: 'RW', title: 'Rwanda' },
  { value: 'BL', title: 'Saint Barthelemy' },
  { value: 'SH', title: 'Saint Helena' },
  { value: 'KN', title: 'Saint Kitts and Nevis' },
  { value: 'LC', title: 'Saint Lucia' },
  { value: 'MF', title: 'Saint Martin' },
  { value: 'PM', title: 'Saint Pierre and Miquelon' },
  { value: 'VC', title: 'Saint Vincent and the Grenadines' },
  { value: 'WS', title: 'Samoa' },
  { value: 'SM', title: 'San Marino' },
  { value: 'ST', title: 'Sao Tome and Principe' },
  { value: 'SA', title: 'Saudi Arabia' },
  { value: 'SN', title: 'Senegal' },
  { value: 'RS', title: 'Serbia' },
  { value: 'CS', title: 'Serbia and Montenegro' },
  { value: 'SC', title: 'Seychelles' },
  { value: 'SL', title: 'Sierra Leone' },
  { value: 'SG', title: 'Singapore' },
  { value: 'SX', title: 'Sint Maarten' },
  { value: 'SK', title: 'Slovakia' },
  { value: 'SI', title: 'Slovenia' },
  { value: 'SB', title: 'Solomon Islands' },
  { value: 'SO', title: 'Somalia' },
  { value: 'ZA', title: 'South Africa' },
  { value: 'GS', title: 'South Georgia and the South Sandwich Islands' },
  { value: 'SS', title: 'South Sudan' },
  { value: 'ES', title: 'Spain' },
  { value: 'LK', title: 'Sri Lanka' },
  { value: 'SD', title: 'Sudan' },
  { value: 'SR', title: 'Suriname' },
  { value: 'SJ', title: 'Svalbard and Jan Mayen' },
  { value: 'SZ', title: 'Swaziland' },
  { value: 'SE', title: 'Sweden' },
  { value: 'CH', title: 'Switzerland' },
  { value: 'SY', title: 'Syrian Arab Republic' },
  { value: 'TW', title: 'Taiwan, professionalvince of China' },
  { value: 'TJ', title: 'Tajikistan' },
  { value: 'TZ', title: 'Tanzania, United Republic of' },
  { value: 'TH', title: 'Thailand' },
  { value: 'TL', title: 'Timor-Leste' },
  { value: 'TG', title: 'Togo' },
  { value: 'TK', title: 'Tokelau' },
  { value: 'TO', title: 'Tonga' },
  { value: 'TT', title: 'Trinidad and Tobago' },
  { value: 'TN', title: 'Tunisia' },
  { value: 'TR', title: 'Turkey' },
  { value: 'TM', title: 'Turkmenistan' },
  { value: 'TC', title: 'Turks and Caicos Islands' },
  { value: 'TV', title: 'Tuvalu' },
  { value: 'UG', title: 'Uganda' },
  { value: 'UA', title: 'Ukraine' },
  { value: 'AE', title: 'United Arab Emirates' },
  { value: 'GB', title: 'United Kingdom' },
  { value: 'US', title: 'United States' },
  { value: 'UM', title: 'United States Minor Outlying Islands' },
  { value: 'UY', title: 'Uruguay' },
  { value: 'UZ', title: 'Uzbekistan' },
  { value: 'VU', title: 'Vanuatu' },
  { value: 'VE', title: 'Venezuela' },
  { value: 'VN', title: 'Viet Nam' },
  { value: 'VG', title: 'Virgin Islands, British' },
  { value: 'VI', title: 'Virgin Islands, U.s.' },
  { value: 'WF', title: 'Wallis and Futuna' },
  { value: 'EH', title: 'Western Sahara' },
  { value: 'YE', title: 'Yemen' },
  { value: 'ZM', title: 'Zambia' },
  { value: 'ZW', title: 'Zimbabwe' },
];
