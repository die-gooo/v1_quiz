Act as a Senior Frontend Developer. Create a mobile-first, interactive web application using React, Tailwind CSS, and Lucide React for icons. The app is a social voting game for a group of 6 friends to rate their dinners/evenings out.

**Project Context:**
- Users: 6 specific participants.
- Goal: Vote on restaurants/evenings and track the leaderboard.
- Data Persistence: Use `localStorage` to save the state so data isn't lost on refresh.
- Language: The UI text must be in Italian.

**Architecture:**
- Use `react-router-dom` for navigation.
- Use a central `GameContext` to manage state (users, active user, evenings, votes, leaderboard calculations).

**Pages Required:**

1.  **Avatar Selection (Home/Login):**
    - Display a grid of 6 distinct avatars (use emojis or Lucide icons).
    - When a user clicks an avatar, they "login" as that user and are redirected to the Evenings page.
    - Highlight the selected user visually.

2.  **Available Evenings (Dashboard):**
    - List past and current evenings/restaurants.
    - Each card shows: Restaurant Name, Date, and a "Vota" (Vote) button if the user hasn't voted yet, or "Modifica" if they have.
    - A button to add a new evening (simple modal or form).

3.  **Voting Form (Modulo Votazioni):**
    - A form to rate a specific evening.
    - Categories: "Cibo" (Food), "Location", "Prezzo/Qualità" (Value).
    - Use sliders (1-10) or Star ratings.
    - Interactive: Show the average score updating in real-time as sliders move.
    - Submit button to save the vote to the global state.

4.  **Leaderboard (Classifica):**
    - A dynamic table or list showing the ranking of restaurants.
    - Calculation: Sort by the highest weighted average of all votes received.
    - Visuals: Gold, Silver, Bronze styling for top 3.
    - Show detailed stats (e.g., who was the strictest voter).

**Technical Requirements:**
- Make the design responsive but prioritize mobile view (large buttons, readable text).
- Use a clean, dark-mode aesthetic (slate/zinc colors).
- Ensure calculations (averages) happen automatically when a new vote is submitted.

**Output:**
Please provide the full code structure, including the Context Provider, the Router setup, and the components for the 4 pages. Put everything in a single file or clearly separated components if too long.
