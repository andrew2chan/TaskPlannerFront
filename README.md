# Using this locally
Use your typical 'npm run start' to the frontend of the app

# Db Schema made with Lucidapp
https://lucid.app/lucidchart/5508136e-c9bc-4352-9cb1-684ada4e8ef1/edit?viewport_loc=-261%2C-137%2C3072%2C1537%2C0_0&invitationId=inv_366ee523-cb27-4e04-aeac-be08daddd686

# Test link
https://white-water-04797a80f.3.azurestaticapps.net/

# Biggest challenge
Learning about how to deal with dates and time zones. Ultimately decided to pass data around in UTC time and convert it back into local time on the front end. Possibly in the future, I would save the dates as strings rather than DateTime Objects so there wouldn't be as much converting when I pass ISOStrings to the backend.

# Assets / tools used
Random image of a shiba inu as the logo. React / Asp.net (Entity framework) / React-big-calendar / React-redux