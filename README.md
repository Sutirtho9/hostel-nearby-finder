
# University Hostel Finder India

A web application to help students find hostels near top Indian universities.

## Features

- Search for hostels by location, city, or university
- Display hostels near top 200 NIRF ranked universities in India
- View hostels within a 10km radius of selected universities
- Interactive map view using Google Maps

## Setup Instructions

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Important Configuration

The map functionality requires a Google Maps API key:

1. Get a Google Maps JavaScript API key from the Google Cloud Console
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` in the `src/components/HostelMap.tsx` file with your actual API key

## Data Sources

- University data based on NIRF 2024 rankings from https://www.nirfindia.org/Rankings
- Hostel information is simulated for demonstration purposes

## Technologies Used

- React with TypeScript
- TailwindCSS for styling
- Shadcn/UI for UI components
- Google Maps API for location visualization
