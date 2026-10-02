const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const MAX_PLAYERS = 12;
const MIN_PLAYERS = 3;


// =====================================
// SERVE WEBSITE
// =====================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// =====================================
// QUESTIONS
// =====================================

const questions = [
    {
        real: "What age do you think someone should be before they move out of their parents' home?",
        imposter: "What age do you think someone should be before they get married?"
    },
    {
        real: "How much money would you spend on your dream pair of trainers? (£)",
        imposter: "How much money would you spend on your dream birthday meal? (£)"
    },
    {
        real: "How many hours could you spend on a road trip before you'd want to stop?",
        imposter: "How many hours could you spend gaming in one day before you'd want to stop?"
    },
    {
        real: "What percentage chance would you give yourself of becoming famous?",
        imposter: "What percentage battery makes you start looking for a charger?"
    },
    {
        real: "How many days would you happily spend on your perfect holiday?",
        imposter: "How many days could you go without using social media?"
    },
    {
        real: "What age were you when you first had your own mobile phone?",
        imposter: "What age do you think children should be allowed to have their own bedroom?"
    },
    {
        real: "How many minutes would you wait for a takeaway before asking where it is?",
        imposter: "How many minutes would you wait in a queue before giving up?"
    },
    {
        real: "What score out of 10 would you give your sense of humour?",
        imposter: "What score out of 10 would you give your ability to stay calm under pressure?"
    },
    {
        real: "How many people could you invite to your ideal party?",
        imposter: "How many people would you be comfortable having at your wedding?"
    },
    {
        real: "What is the highest price (£) you would pay for a concert ticket for your favourite artist?",
        imposter: "What is the highest price (£) you would pay for a meal at the best restaurant in the world?"
    },
    {
        real: "What age would you want to be when you retire?",
        imposter: "What age would you call middle-aged?"
    },
    {
        real: "What age would you want to be when you retire?",
        imposter: "What age would make the perfect age to win the lottery?"
    },
    {
        real: "At what age should someone be allowed to drive a car?",
        imposter: "How old should someone be before getting a tattoo?"
    },
    {
        real: "At what age should someone be allowed to drive a car?",
        imposter: "At what age should someone be able to buy a house?"
    },
    {
        real: "What age feels too old to still live with your parents?",
        imposter: "What age would you like to be for your biggest adventure?"
    },
    {
        real: "What age feels too old to still live with your parents?",
        imposter: "What age would you choose if you could freeze your life there?"
    },
    {
        real: "At what age would you let your child stay home alone?",
        imposter: "At what age should children get their first smartphone?"
    },
    {
        real: "At what age would you let your child stay home alone?",
        imposter: "How old should a puppy be before you take it home?"
    },
    {
        real: "What age would you choose to get your first proper job?",
        imposter: "What age do you think most people stop being childish?"
    },
    {
        real: "What age would you choose to get your first proper job?",
        imposter: "At what age does someone become a teenager in spirit?"
    },
    {
        real: "How old were you when you learned to ride a bike?",
        imposter: "How old were you when you first stayed somewhere without your parents?"
    },
    {
        real: "How old were you when you learned to ride a bike?",
        imposter: "What age would you want your future children to start secondary school?"
    },
    {
        real: "At what age should someone be allowed to vote?",
        imposter: "What age would make the perfect age to win the lottery?"
    },
    {
        real: "At what age should someone be allowed to vote?",
        imposter: "What age would you call properly grown up?"
    },
    {
        real: "What age would you call middle-aged?",
        imposter: "At what age should someone be able to buy a house?"
    },
    {
        real: "What age would you call middle-aged?",
        imposter: "At what age would you happily move to another country?"
    },
    {
        real: "How old should someone be before getting a tattoo?",
        imposter: "What age would you choose if you could freeze your life there?"
    },
    {
        real: "How old should someone be before getting a tattoo?",
        imposter: "How old were you when you first made your own meal?"
    },
    {
        real: "What age would you like to be for your biggest adventure?",
        imposter: "How old should a puppy be before you take it home?"
    },
    {
        real: "What age would you like to be for your biggest adventure?",
        imposter: "What age would you want to be when you first travel alone?"
    },
    {
        real: "At what age should children get their first smartphone?",
        imposter: "At what age does someone become a teenager in spirit?"
    },
    {
        real: "At what age should children get their first smartphone?",
        imposter: "At what age should someone be allowed to rent a car?"
    },
    {
        real: "What age do you think most people stop being childish?",
        imposter: "What age would you want your future children to start secondary school?"
    },
    {
        real: "What age do you think most people stop being childish?",
        imposter: "What age would you consider too young to be famous?"
    },
    {
        real: "How old were you when you first stayed somewhere without your parents?",
        imposter: "What age would you call properly grown up?"
    },
    {
        real: "How old were you when you first stayed somewhere without your parents?",
        imposter: "What age would you want to be when you retire?"
    },
    {
        real: "What age would make the perfect age to win the lottery?",
        imposter: "At what age would you happily move to another country?"
    },
    {
        real: "What age would make the perfect age to win the lottery?",
        imposter: "At what age should someone be allowed to drive a car?"
    },
    {
        real: "At what age should someone be able to buy a house?",
        imposter: "How old were you when you first made your own meal?"
    },
    {
        real: "At what age should someone be able to buy a house?",
        imposter: "What age feels too old to still live with your parents?"
    },
    {
        real: "What age would you choose if you could freeze your life there?",
        imposter: "What age would you want to be when you first travel alone?"
    },
    {
        real: "What age would you choose if you could freeze your life there?",
        imposter: "At what age would you let your child stay home alone?"
    },
    {
        real: "How old should a puppy be before you take it home?",
        imposter: "At what age should someone be allowed to rent a car?"
    },
    {
        real: "How old should a puppy be before you take it home?",
        imposter: "What age would you choose to get your first proper job?"
    },
    {
        real: "At what age does someone become a teenager in spirit?",
        imposter: "What age would you consider too young to be famous?"
    },
    {
        real: "At what age does someone become a teenager in spirit?",
        imposter: "How old were you when you learned to ride a bike?"
    },
    {
        real: "What age would you want your future children to start secondary school?",
        imposter: "What age would you want to be when you retire?"
    },
    {
        real: "What age would you want your future children to start secondary school?",
        imposter: "At what age should someone be allowed to vote?"
    },
    {
        real: "What age would you call properly grown up?",
        imposter: "At what age should someone be allowed to drive a car?"
    },
    {
        real: "What age would you call properly grown up?",
        imposter: "What age would you call middle-aged?"
    },
    {
        real: "At what age would you happily move to another country?",
        imposter: "What age feels too old to still live with your parents?"
    },
    {
        real: "At what age would you happily move to another country?",
        imposter: "How old should someone be before getting a tattoo?"
    },
    {
        real: "How old were you when you first made your own meal?",
        imposter: "At what age would you let your child stay home alone?"
    },
    {
        real: "How old were you when you first made your own meal?",
        imposter: "What age would you like to be for your biggest adventure?"
    },
    {
        real: "What age would you want to be when you first travel alone?",
        imposter: "What age would you choose to get your first proper job?"
    },
    {
        real: "What age would you want to be when you first travel alone?",
        imposter: "At what age should children get their first smartphone?"
    },
    {
        real: "At what age should someone be allowed to rent a car?",
        imposter: "How old were you when you learned to ride a bike?"
    },
    {
        real: "At what age should someone be allowed to rent a car?",
        imposter: "What age do you think most people stop being childish?"
    },
    {
        real: "What age would you consider too young to be famous?",
        imposter: "At what age should someone be allowed to vote?"
    },
    {
        real: "What age would you consider too young to be famous?",
        imposter: "How old were you when you first stayed somewhere without your parents?"
    },
    {
        real: "What would you pay for a really good haircut? (£)",
        imposter: "How much would you pay for a signed item from your favourite celebrity? (£)"
    },
    {
        real: "What would you pay for a really good haircut? (£)",
        imposter: "How much would you pay for a limited-edition item you really wanted? (£)"
    },
    {
        real: "How much is too much for a hoodie? (£)",
        imposter: "What would you spend on a birthday party for yourself? (£)"
    },
    {
        real: "How much is too much for a hoodie? (£)",
        imposter: "What would you spend on a nice dinner for your whole family? (£)"
    },
    {
        real: "What would you spend on a meal for two at a nice restaurant? (£)",
        imposter: "How much would you pay for a day of absolutely no responsibilities? (£)"
    },
    {
        real: "What would you spend on a meal for two at a nice restaurant? (£)",
        imposter: "How much would you pay for a memorable day out? (£)"
    },
    {
        real: "How much would you pay for front-row seats at your favourite show? (£)",
        imposter: "What would you spend on the perfect Christmas present for yourself? (£)"
    },
    {
        real: "How much would you pay for front-row seats at your favourite show? (£)",
        imposter: "What would you spend on a new phone if money were comfortable but not unlimited? (£)"
    },
    {
        real: "What is the most you'd spend on a single meal? (£)",
        imposter: "How much would you pay for a taxi home on a rainy night? (£)"
    },
    {
        real: "What is the most you'd spend on a single meal? (£)",
        imposter: "How much would you pay to sit next to your favourite musician for dinner? (£)"
    },
    {
        real: "How much would you pay for a weekend away? (£)",
        imposter: "What would you spend on a festival ticket? (£)"
    },
    {
        real: "How much would you pay for a weekend away? (£)",
        imposter: "What would you spend on a surprise holiday? (£)"
    },
    {
        real: "What would you spend on a really good pair of headphones? (£)",
        imposter: "How much would you pay for a limited-edition item you really wanted? (£)"
    },
    {
        real: "What would you spend on a really good pair of headphones? (£)",
        imposter: "How much would you pay for a great pair of sunglasses? (£)"
    },
    {
        real: "How much would you pay for a signed item from your favourite celebrity? (£)",
        imposter: "What would you spend on a nice dinner for your whole family? (£)"
    },
    {
        real: "How much would you pay for a signed item from your favourite celebrity? (£)",
        imposter: "What would you spend on a custom cake for a big celebration? (£)"
    },
    {
        real: "What would you spend on a birthday party for yourself? (£)",
        imposter: "How much would you pay for a memorable day out? (£)"
    },
    {
        real: "What would you spend on a birthday party for yourself? (£)",
        imposter: "How much would you pay for the best pizza you've ever had? (£)"
    },
    {
        real: "How much would you pay for a day of absolutely no responsibilities? (£)",
        imposter: "What would you spend on a new phone if money were comfortable but not unlimited? (£)"
    },
    {
        real: "How much would you pay for a day of absolutely no responsibilities? (£)",
        imposter: "What would you spend on a room makeover? (£)"
    },
    {
        real: "What would you spend on the perfect Christmas present for yourself? (£)",
        imposter: "How much would you pay to sit next to your favourite musician for dinner? (£)"
    },
    {
        real: "What would you spend on the perfect Christmas present for yourself? (£)",
        imposter: "How much would you pay for a VIP experience at a sports event? (£)"
    },
    {
        real: "How much would you pay for a taxi home on a rainy night? (£)",
        imposter: "What would you spend on a surprise holiday? (£)"
    },
    {
        real: "How much would you pay for a taxi home on a rainy night? (£)",
        imposter: "What would you spend on a quality winter coat? (£)"
    },
    {
        real: "What would you spend on a festival ticket? (£)",
        imposter: "How much would you pay for a great pair of sunglasses? (£)"
    },
    {
        real: "What would you spend on a festival ticket? (£)",
        imposter: "What would you pay for a really good haircut? (£)"
    },
    {
        real: "How much would you pay for a limited-edition item you really wanted? (£)",
        imposter: "What would you spend on a custom cake for a big celebration? (£)"
    },
    {
        real: "How much would you pay for a limited-edition item you really wanted? (£)",
        imposter: "How much is too much for a hoodie? (£)"
    },
    {
        real: "What would you spend on a nice dinner for your whole family? (£)",
        imposter: "How much would you pay for the best pizza you've ever had? (£)"
    },
    {
        real: "What would you spend on a nice dinner for your whole family? (£)",
        imposter: "What would you spend on a meal for two at a nice restaurant? (£)"
    },
    {
        real: "How much would you pay for a memorable day out? (£)",
        imposter: "What would you spend on a room makeover? (£)"
    },
    {
        real: "How much would you pay for a memorable day out? (£)",
        imposter: "How much would you pay for front-row seats at your favourite show? (£)"
    },
    {
        real: "What would you spend on a new phone if money were comfortable but not unlimited? (£)",
        imposter: "How much would you pay for a VIP experience at a sports event? (£)"
    },
    {
        real: "What would you spend on a new phone if money were comfortable but not unlimited? (£)",
        imposter: "What is the most you'd spend on a single meal? (£)"
    },
    {
        real: "How much would you pay to sit next to your favourite musician for dinner? (£)",
        imposter: "What would you spend on a quality winter coat? (£)"
    },
    {
        real: "How much would you pay to sit next to your favourite musician for dinner? (£)",
        imposter: "How much would you pay for a weekend away? (£)"
    },
    {
        real: "What would you spend on a surprise holiday? (£)",
        imposter: "What would you pay for a really good haircut? (£)"
    },
    {
        real: "What would you spend on a surprise holiday? (£)",
        imposter: "What would you spend on a really good pair of headphones? (£)"
    },
    {
        real: "How much would you pay for a great pair of sunglasses? (£)",
        imposter: "How much is too much for a hoodie? (£)"
    },
    {
        real: "How much would you pay for a great pair of sunglasses? (£)",
        imposter: "How much would you pay for a signed item from your favourite celebrity? (£)"
    },
    {
        real: "What would you spend on a custom cake for a big celebration? (£)",
        imposter: "What would you spend on a meal for two at a nice restaurant? (£)"
    },
    {
        real: "What would you spend on a custom cake for a big celebration? (£)",
        imposter: "What would you spend on a birthday party for yourself? (£)"
    },
    {
        real: "How much would you pay for the best pizza you've ever had? (£)",
        imposter: "How much would you pay for front-row seats at your favourite show? (£)"
    },
    {
        real: "How much would you pay for the best pizza you've ever had? (£)",
        imposter: "How much would you pay for a day of absolutely no responsibilities? (£)"
    },
    {
        real: "What would you spend on a room makeover? (£)",
        imposter: "What is the most you'd spend on a single meal? (£)"
    },
    {
        real: "What would you spend on a room makeover? (£)",
        imposter: "What would you spend on the perfect Christmas present for yourself? (£)"
    },
    {
        real: "How much would you pay for a VIP experience at a sports event? (£)",
        imposter: "How much would you pay for a weekend away? (£)"
    },
    {
        real: "How much would you pay for a VIP experience at a sports event? (£)",
        imposter: "How much would you pay for a taxi home on a rainy night? (£)"
    },
    {
        real: "What would you spend on a quality winter coat? (£)",
        imposter: "What would you spend on a really good pair of headphones? (£)"
    },
    {
        real: "What would you spend on a quality winter coat? (£)",
        imposter: "What would you spend on a festival ticket? (£)"
    },
    {
        real: "How long would you wait for a takeaway before complaining? (minutes)",
        imposter: "How long would you spend getting ready for a normal day? (minutes)"
    },
    {
        real: "How long would you wait for a takeaway before complaining? (minutes)",
        imposter: "How long would you wait for a bus that was already late? (minutes)"
    },
    {
        real: "How long should a first date last? (minutes)",
        imposter: "How long would you wait in a queue before leaving? (minutes)"
    },
    {
        real: "How long should a first date last? (minutes)",
        imposter: "How long should a perfect lunch break be? (minutes)"
    },
    {
        real: "How long would you spend choosing what to watch? (minutes)",
        imposter: "How long should a school lesson feel before a break? (minutes)"
    },
    {
        real: "How long would you spend choosing what to watch? (minutes)",
        imposter: "How long would you spend making a complicated sandwich? (minutes)"
    },
    {
        real: "How long would you wait for a friend who was running late? (minutes)",
        imposter: "How long would you give yourself to tidy a messy bedroom? (minutes)"
    },
    {
        real: "How long would you wait for a friend who was running late? (minutes)",
        imposter: "How long could you sit still without checking your phone? (minutes)"
    },
    {
        real: "How long does a really good shower take? (minutes)",
        imposter: "How long could you spend browsing in a supermarket? (minutes)"
    },
    {
        real: "How long does a really good shower take? (minutes)",
        imposter: "How long would you spend picking a restaurant for a group? (minutes)"
    },
    {
        real: "How long should a quick nap be? (minutes)",
        imposter: "How long should a power nap be if you need to feel refreshed? (minutes)"
    },
    {
        real: "How long should a quick nap be? (minutes)",
        imposter: "How long should a short road-trip stop last? (minutes)"
    },
    {
        real: "How long could you talk to your favourite person without running out of things to say? (minutes)",
        imposter: "How long would you wait for a bus that was already late? (minutes)"
    },
    {
        real: "How long could you talk to your favourite person without running out of things to say? (minutes)",
        imposter: "How long would you wait outside a cinema for your friends? (minutes)"
    },
    {
        real: "How long would you spend getting ready for a normal day? (minutes)",
        imposter: "How long should a perfect lunch break be? (minutes)"
    },
    {
        real: "How long would you spend getting ready for a normal day? (minutes)",
        imposter: "How long would you spend wrapping a present perfectly? (minutes)"
    },
    {
        real: "How long would you wait in a queue before leaving? (minutes)",
        imposter: "How long would you spend making a complicated sandwich? (minutes)"
    },
    {
        real: "How long would you wait in a queue before leaving? (minutes)",
        imposter: "How long could you spend people-watching in a café? (minutes)"
    },
    {
        real: "How long should a school lesson feel before a break? (minutes)",
        imposter: "How long could you sit still without checking your phone? (minutes)"
    },
    {
        real: "How long should a school lesson feel before a break? (minutes)",
        imposter: "How long should a workout warm-up be? (minutes)"
    },
    {
        real: "How long would you give yourself to tidy a messy bedroom? (minutes)",
        imposter: "How long would you spend picking a restaurant for a group? (minutes)"
    },
    {
        real: "How long would you give yourself to tidy a messy bedroom? (minutes)",
        imposter: "How long would you wait before replying to a message you really wanted to answer? (minutes)"
    },
    {
        real: "How long could you spend browsing in a supermarket? (minutes)",
        imposter: "How long should a short road-trip stop last? (minutes)"
    },
    {
        real: "How long could you spend browsing in a supermarket? (minutes)",
        imposter: "How long would you spend looking for the best seat on a train? (minutes)"
    },
    {
        real: "How long should a power nap be if you need to feel refreshed? (minutes)",
        imposter: "How long would you wait outside a cinema for your friends? (minutes)"
    },
    {
        real: "How long should a power nap be if you need to feel refreshed? (minutes)",
        imposter: "How long would you wait for a takeaway before complaining? (minutes)"
    },
    {
        real: "How long would you wait for a bus that was already late? (minutes)",
        imposter: "How long would you spend wrapping a present perfectly? (minutes)"
    },
    {
        real: "How long would you wait for a bus that was already late? (minutes)",
        imposter: "How long should a first date last? (minutes)"
    },
    {
        real: "How long should a perfect lunch break be? (minutes)",
        imposter: "How long could you spend people-watching in a café? (minutes)"
    },
    {
        real: "How long should a perfect lunch break be? (minutes)",
        imposter: "How long would you spend choosing what to watch? (minutes)"
    },
    {
        real: "How long would you spend making a complicated sandwich? (minutes)",
        imposter: "How long should a workout warm-up be? (minutes)"
    },
    {
        real: "How long would you spend making a complicated sandwich? (minutes)",
        imposter: "How long would you wait for a friend who was running late? (minutes)"
    },
    {
        real: "How long could you sit still without checking your phone? (minutes)",
        imposter: "How long would you wait before replying to a message you really wanted to answer? (minutes)"
    },
    {
        real: "How long could you sit still without checking your phone? (minutes)",
        imposter: "How long does a really good shower take? (minutes)"
    },
    {
        real: "How long would you spend picking a restaurant for a group? (minutes)",
        imposter: "How long would you spend looking for the best seat on a train? (minutes)"
    },
    {
        real: "How long would you spend picking a restaurant for a group? (minutes)",
        imposter: "How long should a quick nap be? (minutes)"
    },
    {
        real: "How long should a short road-trip stop last? (minutes)",
        imposter: "How long would you wait for a takeaway before complaining? (minutes)"
    },
    {
        real: "How long should a short road-trip stop last? (minutes)",
        imposter: "How long could you talk to your favourite person without running out of things to say? (minutes)"
    },
    {
        real: "How long would you wait outside a cinema for your friends? (minutes)",
        imposter: "How long should a first date last? (minutes)"
    },
    {
        real: "How long would you wait outside a cinema for your friends? (minutes)",
        imposter: "How long would you spend getting ready for a normal day? (minutes)"
    },
    {
        real: "How long would you spend wrapping a present perfectly? (minutes)",
        imposter: "How long would you spend choosing what to watch? (minutes)"
    },
    {
        real: "How long would you spend wrapping a present perfectly? (minutes)",
        imposter: "How long would you wait in a queue before leaving? (minutes)"
    },
    {
        real: "How long could you spend people-watching in a café? (minutes)",
        imposter: "How long would you wait for a friend who was running late? (minutes)"
    },
    {
        real: "How long could you spend people-watching in a café? (minutes)",
        imposter: "How long should a school lesson feel before a break? (minutes)"
    },
    {
        real: "How long should a workout warm-up be? (minutes)",
        imposter: "How long does a really good shower take? (minutes)"
    },
    {
        real: "How long should a workout warm-up be? (minutes)",
        imposter: "How long would you give yourself to tidy a messy bedroom? (minutes)"
    },
    {
        real: "How long would you wait before replying to a message you really wanted to answer? (minutes)",
        imposter: "How long should a quick nap be? (minutes)"
    },
    {
        real: "How long would you wait before replying to a message you really wanted to answer? (minutes)",
        imposter: "How long could you spend browsing in a supermarket? (minutes)"
    },
    {
        real: "How long would you spend looking for the best seat on a train? (minutes)",
        imposter: "How long could you talk to your favourite person without running out of things to say? (minutes)"
    },
    {
        real: "How long would you spend looking for the best seat on a train? (minutes)",
        imposter: "How long should a power nap be if you need to feel refreshed? (minutes)"
    },
    {
        real: "How many hours could you spend on a road trip before needing a proper stop?",
        imposter: "How many hours could you binge a TV series without stopping?"
    },
    {
        real: "How many hours could you spend on a road trip before needing a proper stop?",
        imposter: "How many hours could you spend at a music festival in one day?"
    },
    {
        real: "How many hours would your perfect weekend nap last?",
        imposter: "How many hours could you comfortably spend on a train?"
    },
    {
        real: "How many hours would your perfect weekend nap last?",
        imposter: "How many hours could you walk around a giant city before needing a rest?"
    },
    {
        real: "How many hours could you spend at a theme park in one day?",
        imposter: "How many hours would you want for a long Sunday lunch with friends?"
    },
    {
        real: "How many hours could you spend at a theme park in one day?",
        imposter: "How many hours could you go without checking your phone on holiday?"
    },
    {
        real: "How many hours would you happily spend exploring a new city?",
        imposter: "How many hours could you spend shopping without getting bored?"
    },
    {
        real: "How many hours would you happily spend exploring a new city?",
        imposter: "How many hours would you happily spend cooking a huge meal?"
    },
    {
        real: "How many hours could you play your favourite game in one sitting?",
        imposter: "How many hours could you sleep if you had no alarm?"
    },
    {
        real: "How many hours could you play your favourite game in one sitting?",
        imposter: "How many hours could you spend on a plane before getting uncomfortable?"
    },
    {
        real: "How many hours could you stay at a party before wanting to leave?",
        imposter: "How many hours would a perfect gaming session last?"
    },
    {
        real: "How many hours could you stay at a party before wanting to leave?",
        imposter: "How many hours could you spend at a family gathering before needing space?"
    },
    {
        real: "How many hours would you spend on a perfect beach day?",
        imposter: "How many hours could you spend at a music festival in one day?"
    },
    {
        real: "How many hours would you spend on a perfect beach day?",
        imposter: "How many hours would you want for a dream date?"
    },
    {
        real: "How many hours could you binge a TV series without stopping?",
        imposter: "How many hours could you walk around a giant city before needing a rest?"
    },
    {
        real: "How many hours could you binge a TV series without stopping?",
        imposter: "How many hours could you spend reading one really good book?"
    },
    {
        real: "How many hours could you comfortably spend on a train?",
        imposter: "How many hours could you go without checking your phone on holiday?"
    },
    {
        real: "How many hours could you comfortably spend on a train?",
        imposter: "How many hours could you stay awake at a sleepover?"
    },
    {
        real: "How many hours would you want for a long Sunday lunch with friends?",
        imposter: "How many hours would you happily spend cooking a huge meal?"
    },
    {
        real: "How many hours would you want for a long Sunday lunch with friends?",
        imposter: "How many hours would your ideal workday actually be?"
    },
    {
        real: "How many hours could you spend shopping without getting bored?",
        imposter: "How many hours could you spend on a plane before getting uncomfortable?"
    },
    {
        real: "How many hours could you spend shopping without getting bored?",
        imposter: "How many hours could you spend in a swimming pool?"
    },
    {
        real: "How many hours could you sleep if you had no alarm?",
        imposter: "How many hours could you spend at a family gathering before needing space?"
    },
    {
        real: "How many hours could you sleep if you had no alarm?",
        imposter: "How many hours could you spend at your favourite sporting event?"
    },
    {
        real: "How many hours would a perfect gaming session last?",
        imposter: "How many hours would you want for a dream date?"
    },
    {
        real: "How many hours would a perfect gaming session last?",
        imposter: "How many hours could you spend on a road trip before needing a proper stop?"
    },
    {
        real: "How many hours could you spend at a music festival in one day?",
        imposter: "How many hours could you spend reading one really good book?"
    },
    {
        real: "How many hours could you spend at a music festival in one day?",
        imposter: "How many hours would your perfect weekend nap last?"
    },
    {
        real: "How many hours could you walk around a giant city before needing a rest?",
        imposter: "How many hours could you stay awake at a sleepover?"
    },
    {
        real: "How many hours could you walk around a giant city before needing a rest?",
        imposter: "How many hours could you spend at a theme park in one day?"
    },
    {
        real: "How many hours could you go without checking your phone on holiday?",
        imposter: "How many hours would your ideal workday actually be?"
    },
    {
        real: "How many hours could you go without checking your phone on holiday?",
        imposter: "How many hours would you happily spend exploring a new city?"
    },
    {
        real: "How many hours would you happily spend cooking a huge meal?",
        imposter: "How many hours could you spend in a swimming pool?"
    },
    {
        real: "How many hours would you happily spend cooking a huge meal?",
        imposter: "How many hours could you play your favourite game in one sitting?"
    },
    {
        real: "How many hours could you spend on a plane before getting uncomfortable?",
        imposter: "How many hours could you spend at your favourite sporting event?"
    },
    {
        real: "How many hours could you spend on a plane before getting uncomfortable?",
        imposter: "How many hours could you stay at a party before wanting to leave?"
    },
    {
        real: "How many hours could you spend at a family gathering before needing space?",
        imposter: "How many hours could you spend on a road trip before needing a proper stop?"
    },
    {
        real: "How many hours could you spend at a family gathering before needing space?",
        imposter: "How many hours would you spend on a perfect beach day?"
    },
    {
        real: "How many hours would you want for a dream date?",
        imposter: "How many hours would your perfect weekend nap last?"
    },
    {
        real: "How many hours would you want for a dream date?",
        imposter: "How many hours could you binge a TV series without stopping?"
    },
    {
        real: "How many hours could you spend reading one really good book?",
        imposter: "How many hours could you spend at a theme park in one day?"
    },
    {
        real: "How many hours could you spend reading one really good book?",
        imposter: "How many hours could you comfortably spend on a train?"
    },
    {
        real: "How many hours could you stay awake at a sleepover?",
        imposter: "How many hours would you happily spend exploring a new city?"
    },
    {
        real: "How many hours could you stay awake at a sleepover?",
        imposter: "How many hours would you want for a long Sunday lunch with friends?"
    },
    {
        real: "How many hours would your ideal workday actually be?",
        imposter: "How many hours could you play your favourite game in one sitting?"
    },
    {
        real: "How many hours would your ideal workday actually be?",
        imposter: "How many hours could you spend shopping without getting bored?"
    },
    {
        real: "How many hours could you spend in a swimming pool?",
        imposter: "How many hours could you stay at a party before wanting to leave?"
    },
    {
        real: "How many hours could you spend in a swimming pool?",
        imposter: "How many hours could you sleep if you had no alarm?"
    },
    {
        real: "How many hours could you spend at your favourite sporting event?",
        imposter: "How many hours would you spend on a perfect beach day?"
    },
    {
        real: "How many hours could you spend at your favourite sporting event?",
        imposter: "How many hours would a perfect gaming session last?"
    },
    {
        real: "What percentage chance would you give yourself of winning a random talent show?",
        imposter: "What percentage of a perfect pizza should be cheese?"
    },
    {
        real: "What percentage chance would you give yourself of winning a random talent show?",
        imposter: "What percentage of your food delivery order should be something you've never tried?"
    },
    {
        real: "What percentage of a cake should the birthday person get?",
        imposter: "What percentage chance would you give yourself of finding a lost phone?"
    },
    {
        real: "What percentage of a cake should the birthday person get?",
        imposter: "What percentage chance would you give yourself of recognising someone from just their voice?"
    },
    {
        real: "What percentage chance would you give yourself of surviving a zombie movie?",
        imposter: "What percentage of your free time should be completely unplanned?"
    },
    {
        real: "What percentage chance would you give yourself of surviving a zombie movie?",
        imposter: "What percentage of your room would need to be tidy before you call it clean?"
    },
    {
        real: "What percentage of your wardrobe do you actually wear regularly?",
        imposter: "What percentage chance would you give yourself of keeping a surprise secret?"
    },
    {
        real: "What percentage of your wardrobe do you actually wear regularly?",
        imposter: "What percentage chance would you give yourself of becoming good at a new sport within a month?"
    },
    {
        real: "What percentage chance would you give yourself of remembering a password from ten years ago?",
        imposter: "What percentage of a party should involve music?"
    },
    {
        real: "What percentage chance would you give yourself of remembering a password from ten years ago?",
        imposter: "What percentage of your holiday budget should go on food?"
    },
    {
        real: "What percentage of your ideal holiday should be spent relaxing?",
        imposter: "What percentage chance would you give yourself of surviving one night in the wild?"
    },
    {
        real: "What percentage of your ideal holiday should be spent relaxing?",
        imposter: "What percentage chance would you give yourself of making it through a week without social media?"
    },
    {
        real: "What percentage chance would you give yourself of winning against a goose?",
        imposter: "What percentage of your food delivery order should be something you've never tried?"
    },
    {
        real: "What percentage chance would you give yourself of winning against a goose?",
        imposter: "What percentage of a school day should be breaks?"
    },
    {
        real: "What percentage of a perfect pizza should be cheese?",
        imposter: "What percentage chance would you give yourself of recognising someone from just their voice?"
    },
    {
        real: "What percentage of a perfect pizza should be cheese?",
        imposter: "What percentage chance would you give yourself of winning a pub quiz?"
    },
    {
        real: "What percentage chance would you give yourself of finding a lost phone?",
        imposter: "What percentage of your room would need to be tidy before you call it clean?"
    },
    {
        real: "What percentage chance would you give yourself of finding a lost phone?",
        imposter: "What percentage of your day should be spent doing something just for fun?"
    },
    {
        real: "What percentage of your free time should be completely unplanned?",
        imposter: "What percentage chance would you give yourself of becoming good at a new sport within a month?"
    },
    {
        real: "What percentage of your free time should be completely unplanned?",
        imposter: "What percentage chance would you give yourself of living to 100?"
    },
    {
        real: "What percentage chance would you give yourself of keeping a surprise secret?",
        imposter: "What percentage of your holiday budget should go on food?"
    },
    {
        real: "What percentage chance would you give yourself of keeping a surprise secret?",
        imposter: "What percentage of a movie should be action before it becomes too much?"
    },
    {
        real: "What percentage of a party should involve music?",
        imposter: "What percentage chance would you give yourself of making it through a week without social media?"
    },
    {
        real: "What percentage of a party should involve music?",
        imposter: "What percentage chance would you give yourself of talking your way out of a speeding ticket?"
    },
    {
        real: "What percentage chance would you give yourself of surviving one night in the wild?",
        imposter: "What percentage of a school day should be breaks?"
    },
    {
        real: "What percentage chance would you give yourself of surviving one night in the wild?",
        imposter: "What percentage chance would you give yourself of winning a random talent show?"
    },
    {
        real: "What percentage of your food delivery order should be something you've never tried?",
        imposter: "What percentage chance would you give yourself of winning a pub quiz?"
    },
    {
        real: "What percentage of your food delivery order should be something you've never tried?",
        imposter: "What percentage of a cake should the birthday person get?"
    },
    {
        real: "What percentage chance would you give yourself of recognising someone from just their voice?",
        imposter: "What percentage of your day should be spent doing something just for fun?"
    },
    {
        real: "What percentage chance would you give yourself of recognising someone from just their voice?",
        imposter: "What percentage chance would you give yourself of surviving a zombie movie?"
    },
    {
        real: "What percentage of your room would need to be tidy before you call it clean?",
        imposter: "What percentage chance would you give yourself of living to 100?"
    },
    {
        real: "What percentage of your room would need to be tidy before you call it clean?",
        imposter: "What percentage of your wardrobe do you actually wear regularly?"
    },
    {
        real: "What percentage chance would you give yourself of becoming good at a new sport within a month?",
        imposter: "What percentage of a movie should be action before it becomes too much?"
    },
    {
        real: "What percentage chance would you give yourself of becoming good at a new sport within a month?",
        imposter: "What percentage chance would you give yourself of remembering a password from ten years ago?"
    },
    {
        real: "What percentage of your holiday budget should go on food?",
        imposter: "What percentage chance would you give yourself of talking your way out of a speeding ticket?"
    },
    {
        real: "What percentage of your holiday budget should go on food?",
        imposter: "What percentage of your ideal holiday should be spent relaxing?"
    },
    {
        real: "What percentage chance would you give yourself of making it through a week without social media?",
        imposter: "What percentage chance would you give yourself of winning a random talent show?"
    },
    {
        real: "What percentage chance would you give yourself of making it through a week without social media?",
        imposter: "What percentage chance would you give yourself of winning against a goose?"
    },
    {
        real: "What percentage of a school day should be breaks?",
        imposter: "What percentage of a cake should the birthday person get?"
    },
    {
        real: "What percentage of a school day should be breaks?",
        imposter: "What percentage of a perfect pizza should be cheese?"
    },
    {
        real: "What percentage chance would you give yourself of winning a pub quiz?",
        imposter: "What percentage chance would you give yourself of surviving a zombie movie?"
    },
    {
        real: "What percentage chance would you give yourself of winning a pub quiz?",
        imposter: "What percentage chance would you give yourself of finding a lost phone?"
    },
    {
        real: "What percentage of your day should be spent doing something just for fun?",
        imposter: "What percentage of your wardrobe do you actually wear regularly?"
    },
    {
        real: "What percentage of your day should be spent doing something just for fun?",
        imposter: "What percentage of your free time should be completely unplanned?"
    },
    {
        real: "What percentage chance would you give yourself of living to 100?",
        imposter: "What percentage chance would you give yourself of remembering a password from ten years ago?"
    },
    {
        real: "What percentage chance would you give yourself of living to 100?",
        imposter: "What percentage chance would you give yourself of keeping a surprise secret?"
    },
    {
        real: "What percentage of a movie should be action before it becomes too much?",
        imposter: "What percentage of your ideal holiday should be spent relaxing?"
    },
    {
        real: "What percentage of a movie should be action before it becomes too much?",
        imposter: "What percentage of a party should involve music?"
    },
    {
        real: "What percentage chance would you give yourself of talking your way out of a speeding ticket?",
        imposter: "What percentage chance would you give yourself of winning against a goose?"
    },
    {
        real: "What percentage chance would you give yourself of talking your way out of a speeding ticket?",
        imposter: "What percentage chance would you give yourself of surviving one night in the wild?"
    },
    {
        real: "How many books would you take on a two-week holiday?",
        imposter: "How many presents would feel like a lot on your birthday?"
    },
    {
        real: "How many books would you take on a two-week holiday?",
        imposter: "How many board games should a good game shelf have?"
    },
    {
        real: "How many pizzas would be enough for the perfect party?",
        imposter: "How many people would you trust with your house keys?"
    },
    {
        real: "How many pizzas would be enough for the perfect party?",
        imposter: "How many guests would make a dinner party feel crowded?"
    },
    {
        real: "How many houseplants could you realistically look after?",
        imposter: "How many pets could you comfortably have?"
    },
    {
        real: "How many houseplants could you realistically look after?",
        imposter: "How many countries would you like to visit in your lifetime?"
    },
    {
        real: "How many songs belong on your perfect road-trip playlist?",
        imposter: "How many films would you choose for an all-day marathon?"
    },
    {
        real: "How many songs belong on your perfect road-trip playlist?",
        imposter: "How many cups should a giant mug hold to be ridiculous?"
    },
    {
        real: "How many alarms would you set if you absolutely could not be late?",
        imposter: "How many slices of pizza could you eat on a very good day?"
    },
    {
        real: "How many alarms would you set if you absolutely could not be late?",
        imposter: "How many photos are too many for one social media post?"
    },
    {
        real: "How many snacks would you pack for a long journey?",
        imposter: "How many pairs of trainers would count as a collection?"
    },
    {
        real: "How many snacks would you pack for a long journey?",
        imposter: "How many times would you rehearse before giving a big speech?"
    },
    {
        real: "How many photos would you take on a memorable holiday?",
        imposter: "How many board games should a good game shelf have?"
    },
    {
        real: "How many photos would you take on a memorable holiday?",
        imposter: "How many cushions should a sofa have before it looks excessive?"
    },
    {
        real: "How many presents would feel like a lot on your birthday?",
        imposter: "How many guests would make a dinner party feel crowded?"
    },
    {
        real: "How many presents would feel like a lot on your birthday?",
        imposter: "How many takeaway menus should a household keep?"
    },
    {
        real: "How many people would you trust with your house keys?",
        imposter: "How many countries would you like to visit in your lifetime?"
    },
    {
        real: "How many people would you trust with your house keys?",
        imposter: "How many plants would make a room feel like a jungle?"
    },
    {
        real: "How many pets could you comfortably have?",
        imposter: "How many cups should a giant mug hold to be ridiculous?"
    },
    {
        real: "How many pets could you comfortably have?",
        imposter: "How many pieces should a perfect picnic include?"
    },
    {
        real: "How many films would you choose for an all-day marathon?",
        imposter: "How many photos are too many for one social media post?"
    },
    {
        real: "How many films would you choose for an all-day marathon?",
        imposter: "How many songs would you skip before giving a playlist a bad review?"
    },
    {
        real: "How many slices of pizza could you eat on a very good day?",
        imposter: "How many times would you rehearse before giving a big speech?"
    },
    {
        real: "How many slices of pizza could you eat on a very good day?",
        imposter: "How many tabs can you have open before the browser feels chaotic?"
    },
    {
        real: "How many pairs of trainers would count as a collection?",
        imposter: "How many cushions should a sofa have before it looks excessive?"
    },
    {
        real: "How many pairs of trainers would count as a collection?",
        imposter: "How many books would you take on a two-week holiday?"
    },
    {
        real: "How many board games should a good game shelf have?",
        imposter: "How many takeaway menus should a household keep?"
    },
    {
        real: "How many board games should a good game shelf have?",
        imposter: "How many pizzas would be enough for the perfect party?"
    },
    {
        real: "How many guests would make a dinner party feel crowded?",
        imposter: "How many plants would make a room feel like a jungle?"
    },
    {
        real: "How many guests would make a dinner party feel crowded?",
        imposter: "How many houseplants could you realistically look after?"
    },
    {
        real: "How many countries would you like to visit in your lifetime?",
        imposter: "How many pieces should a perfect picnic include?"
    },
    {
        real: "How many countries would you like to visit in your lifetime?",
        imposter: "How many songs belong on your perfect road-trip playlist?"
    },
    {
        real: "How many cups should a giant mug hold to be ridiculous?",
        imposter: "How many songs would you skip before giving a playlist a bad review?"
    },
    {
        real: "How many cups should a giant mug hold to be ridiculous?",
        imposter: "How many alarms would you set if you absolutely could not be late?"
    },
    {
        real: "How many photos are too many for one social media post?",
        imposter: "How many tabs can you have open before the browser feels chaotic?"
    },
    {
        real: "How many photos are too many for one social media post?",
        imposter: "How many snacks would you pack for a long journey?"
    },
    {
        real: "How many times would you rehearse before giving a big speech?",
        imposter: "How many books would you take on a two-week holiday?"
    },
    {
        real: "How many times would you rehearse before giving a big speech?",
        imposter: "How many photos would you take on a memorable holiday?"
    },
    {
        real: "How many cushions should a sofa have before it looks excessive?",
        imposter: "How many pizzas would be enough for the perfect party?"
    },
    {
        real: "How many cushions should a sofa have before it looks excessive?",
        imposter: "How many presents would feel like a lot on your birthday?"
    },
    {
        real: "How many takeaway menus should a household keep?",
        imposter: "How many houseplants could you realistically look after?"
    },
    {
        real: "How many takeaway menus should a household keep?",
        imposter: "How many people would you trust with your house keys?"
    },
    {
        real: "How many plants would make a room feel like a jungle?",
        imposter: "How many songs belong on your perfect road-trip playlist?"
    },
    {
        real: "How many plants would make a room feel like a jungle?",
        imposter: "How many pets could you comfortably have?"
    },
    {
        real: "How many pieces should a perfect picnic include?",
        imposter: "How many alarms would you set if you absolutely could not be late?"
    },
    {
        real: "How many pieces should a perfect picnic include?",
        imposter: "How many films would you choose for an all-day marathon?"
    },
    {
        real: "How many songs would you skip before giving a playlist a bad review?",
        imposter: "How many snacks would you pack for a long journey?"
    },
    {
        real: "How many songs would you skip before giving a playlist a bad review?",
        imposter: "How many slices of pizza could you eat on a very good day?"
    },
    {
        real: "How many tabs can you have open before the browser feels chaotic?",
        imposter: "How many photos would you take on a memorable holiday?"
    },
    {
        real: "How many tabs can you have open before the browser feels chaotic?",
        imposter: "How many pairs of trainers would count as a collection?"
    },
    {
        real: "How would you rate your cooking skills out of 10?",
        imposter: "What score out of 10 would you give your patience?"
    },
    {
        real: "How would you rate your cooking skills out of 10?",
        imposter: "What score out of 10 would you give your ability to organise a trip?"
    },
    {
        real: "What would you score your dancing ability out of 10?",
        imposter: "How would you rate your ability to tell when someone is lying?"
    },
    {
        real: "What would you score your dancing ability out of 10?",
        imposter: "How would you rate your luck, out of 10?"
    },
    {
        real: "How good are you at keeping secrets, out of 10?",
        imposter: "What score out of 10 would you give your sense of direction?"
    },
    {
        real: "How good are you at keeping secrets, out of 10?",
        imposter: "What score out of 10 would you give your ability to choose a good film?"
    },
    {
        real: "What rating would you give your own fashion sense, out of 10?",
        imposter: "How good are you at remembering names, out of 10?"
    },
    {
        real: "What rating would you give your own fashion sense, out of 10?",
        imposter: "How good are you at multitasking, out of 10?"
    },
    {
        real: "How would you score your ability to wake up without an alarm?",
        imposter: "What would you score your competitive side out of 10?"
    },
    {
        real: "How would you score your ability to wake up without an alarm?",
        imposter: "What score out of 10 would you give your breakfast-making skills?"
    },
    {
        real: "What score out of 10 would you give your singing voice?",
        imposter: "How would you rate your ability to make small talk?"
    },
    {
        real: "What score out of 10 would you give your singing voice?",
        imposter: "How would you rate your ability to stay awake on a long journey?"
    },
    {
        real: "How would you rate your handwriting out of 10?",
        imposter: "What score out of 10 would you give your ability to organise a trip?"
    },
    {
        real: "How would you rate your handwriting out of 10?",
        imposter: "What score out of 10 would you give your meme knowledge?"
    },
    {
        real: "What score out of 10 would you give your patience?",
        imposter: "How would you rate your luck, out of 10?"
    },
    {
        real: "What score out of 10 would you give your patience?",
        imposter: "How would you rate your ability to bargain for a better price?"
    },
    {
        real: "How would you rate your ability to tell when someone is lying?",
        imposter: "What score out of 10 would you give your ability to choose a good film?"
    },
    {
        real: "How would you rate your ability to tell when someone is lying?",
        imposter: "What score out of 10 would you give your ability to tell a story?"
    },
    {
        real: "What score out of 10 would you give your sense of direction?",
        imposter: "How good are you at multitasking, out of 10?"
    },
    {
        real: "What score out of 10 would you give your sense of direction?",
        imposter: "How good are you at keeping a straight face, out of 10?"
    },
    {
        real: "How good are you at remembering names, out of 10?",
        imposter: "What score out of 10 would you give your breakfast-making skills?"
    },
    {
        real: "How good are you at remembering names, out of 10?",
        imposter: "What score out of 10 would you give your ability to handle embarrassment?"
    },
    {
        real: "What would you score your competitive side out of 10?",
        imposter: "How would you rate your ability to stay awake on a long journey?"
    },
    {
        real: "What would you score your competitive side out of 10?",
        imposter: "How would you rate your bravery on a roller coaster?"
    },
    {
        real: "How would you rate your ability to make small talk?",
        imposter: "What score out of 10 would you give your meme knowledge?"
    },
    {
        real: "How would you rate your ability to make small talk?",
        imposter: "How would you rate your cooking skills out of 10?"
    },
    {
        real: "What score out of 10 would you give your ability to organise a trip?",
        imposter: "How would you rate your ability to bargain for a better price?"
    },
    {
        real: "What score out of 10 would you give your ability to organise a trip?",
        imposter: "What would you score your dancing ability out of 10?"
    },
    {
        real: "How would you rate your luck, out of 10?",
        imposter: "What score out of 10 would you give your ability to tell a story?"
    },
    {
        real: "How would you rate your luck, out of 10?",
        imposter: "How good are you at keeping secrets, out of 10?"
    },
    {
        real: "What score out of 10 would you give your ability to choose a good film?",
        imposter: "How good are you at keeping a straight face, out of 10?"
    },
    {
        real: "What score out of 10 would you give your ability to choose a good film?",
        imposter: "What rating would you give your own fashion sense, out of 10?"
    },
    {
        real: "How good are you at multitasking, out of 10?",
        imposter: "What score out of 10 would you give your ability to handle embarrassment?"
    },
    {
        real: "How good are you at multitasking, out of 10?",
        imposter: "How would you score your ability to wake up without an alarm?"
    },
    {
        real: "What score out of 10 would you give your breakfast-making skills?",
        imposter: "How would you rate your bravery on a roller coaster?"
    },
    {
        real: "What score out of 10 would you give your breakfast-making skills?",
        imposter: "What score out of 10 would you give your singing voice?"
    },
    {
        real: "How would you rate your ability to stay awake on a long journey?",
        imposter: "How would you rate your cooking skills out of 10?"
    },
    {
        real: "How would you rate your ability to stay awake on a long journey?",
        imposter: "How would you rate your handwriting out of 10?"
    },
    {
        real: "What score out of 10 would you give your meme knowledge?",
        imposter: "What would you score your dancing ability out of 10?"
    },
    {
        real: "What score out of 10 would you give your meme knowledge?",
        imposter: "What score out of 10 would you give your patience?"
    },
    {
        real: "How would you rate your ability to bargain for a better price?",
        imposter: "How good are you at keeping secrets, out of 10?"
    },
    {
        real: "How would you rate your ability to bargain for a better price?",
        imposter: "How would you rate your ability to tell when someone is lying?"
    },
    {
        real: "What score out of 10 would you give your ability to tell a story?",
        imposter: "What rating would you give your own fashion sense, out of 10?"
    },
    {
        real: "What score out of 10 would you give your ability to tell a story?",
        imposter: "What score out of 10 would you give your sense of direction?"
    },
    {
        real: "How good are you at keeping a straight face, out of 10?",
        imposter: "How would you score your ability to wake up without an alarm?"
    },
    {
        real: "How good are you at keeping a straight face, out of 10?",
        imposter: "How good are you at remembering names, out of 10?"
    },
    {
        real: "What score out of 10 would you give your ability to handle embarrassment?",
        imposter: "What score out of 10 would you give your singing voice?"
    },
    {
        real: "What score out of 10 would you give your ability to handle embarrassment?",
        imposter: "What would you score your competitive side out of 10?"
    },
    {
        real: "How would you rate your bravery on a roller coaster?",
        imposter: "How would you rate your handwriting out of 10?"
    },
    {
        real: "How would you rate your bravery on a roller coaster?",
        imposter: "How would you rate your ability to make small talk?"
    },
    {
        real: "How far would you walk for your favourite takeaway if you had to? (km)",
        imposter: "How far could you hike before needing a proper rest? (km)"
    },
    {
        real: "How far would you walk for your favourite takeaway if you had to? (km)",
        imposter: "How far could you jog at an easy pace? (km)"
    },
    {
        real: "How far could you throw a ball accurately? (metres)",
        imposter: "How far would you drive for a concert you really wanted to see? (km)"
    },
    {
        real: "How far could you throw a ball accurately? (metres)",
        imposter: "How far away should a campsite be from civilisation? (km)"
    },
    {
        real: "How far would you travel for the best restaurant you've ever visited? (km)",
        imposter: "How far could you swim without stopping? (metres)"
    },
    {
        real: "How far would you travel for the best restaurant you've ever visited? (km)",
        imposter: "How far would you travel for your dream birthday experience? (km)"
    },
    {
        real: "How far should a comfortable daily walk be? (km)",
        imposter: "How far would you walk to save £10? (km)"
    },
    {
        real: "How far should a comfortable daily walk be? (km)",
        imposter: "How far could you carry a heavy shopping bag before needing a break? (metres)"
    },
    {
        real: "How far would you cycle for a perfect day out? (km)",
        imposter: "How far should a good neighbourhood walking route be? (km)"
    },
    {
        real: "How far would you cycle for a perfect day out? (km)",
        imposter: "How far would you go for the perfect beach? (km)"
    },
    {
        real: "How far away should your ideal holiday destination be? (km)",
        imposter: "How far would you travel to visit your favourite person? (km)"
    },
    {
        real: "How far away should your ideal holiday destination be? (km)",
        imposter: "How far could you cycle before your legs complain? (km)"
    },
    {
        real: "How far would you run to catch a bus? (metres)",
        imposter: "How far could you jog at an easy pace? (km)"
    },
    {
        real: "How far would you run to catch a bus? (metres)",
        imposter: "How far would you walk in the rain before giving up? (km)"
    },
    {
        real: "How far could you hike before needing a proper rest? (km)",
        imposter: "How far away should a campsite be from civilisation? (km)"
    },
    {
        real: "How far could you hike before needing a proper rest? (km)",
        imposter: "How far should a perfect scenic walk be? (km)"
    },
    {
        real: "How far would you drive for a concert you really wanted to see? (km)",
        imposter: "How far would you travel for your dream birthday experience? (km)"
    },
    {
        real: "How far would you drive for a concert you really wanted to see? (km)",
        imposter: "How far would you travel for a one-night stay somewhere amazing? (km)"
    },
    {
        real: "How far could you swim without stopping? (metres)",
        imposter: "How far could you carry a heavy shopping bag before needing a break? (metres)"
    },
    {
        real: "How far could you swim without stopping? (metres)",
        imposter: "How far could you sprint before needing to stop? (metres)"
    },
    {
        real: "How far would you walk to save £10? (km)",
        imposter: "How far would you go for the perfect beach? (km)"
    },
    {
        real: "How far would you walk to save £10? (km)",
        imposter: "How far would you go to find the best pizza in town? (km)"
    },
    {
        real: "How far should a good neighbourhood walking route be? (km)",
        imposter: "How far could you cycle before your legs complain? (km)"
    },
    {
        real: "How far should a good neighbourhood walking route be? (km)",
        imposter: "How far should a school trip feel before it becomes a journey? (km)"
    },
    {
        real: "How far would you travel to visit your favourite person? (km)",
        imposter: "How far would you walk in the rain before giving up? (km)"
    },
    {
        real: "How far would you travel to visit your favourite person? (km)",
        imposter: "How far would you walk for your favourite takeaway if you had to? (km)"
    },
    {
        real: "How far could you jog at an easy pace? (km)",
        imposter: "How far should a perfect scenic walk be? (km)"
    },
    {
        real: "How far could you jog at an easy pace? (km)",
        imposter: "How far could you throw a ball accurately? (metres)"
    },
    {
        real: "How far away should a campsite be from civilisation? (km)",
        imposter: "How far would you travel for a one-night stay somewhere amazing? (km)"
    },
    {
        real: "How far away should a campsite be from civilisation? (km)",
        imposter: "How far would you travel for the best restaurant you've ever visited? (km)"
    },
    {
        real: "How far would you travel for your dream birthday experience? (km)",
        imposter: "How far could you sprint before needing to stop? (metres)"
    },
    {
        real: "How far would you travel for your dream birthday experience? (km)",
        imposter: "How far should a comfortable daily walk be? (km)"
    },
    {
        real: "How far could you carry a heavy shopping bag before needing a break? (metres)",
        imposter: "How far would you go to find the best pizza in town? (km)"
    },
    {
        real: "How far could you carry a heavy shopping bag before needing a break? (metres)",
        imposter: "How far would you cycle for a perfect day out? (km)"
    },
    {
        real: "How far would you go for the perfect beach? (km)",
        imposter: "How far should a school trip feel before it becomes a journey? (km)"
    },
    {
        real: "How far would you go for the perfect beach? (km)",
        imposter: "How far away should your ideal holiday destination be? (km)"
    },
    {
        real: "How far could you cycle before your legs complain? (km)",
        imposter: "How far would you walk for your favourite takeaway if you had to? (km)"
    },
    {
        real: "How far could you cycle before your legs complain? (km)",
        imposter: "How far would you run to catch a bus? (metres)"
    },
    {
        real: "How far would you walk in the rain before giving up? (km)",
        imposter: "How far could you throw a ball accurately? (metres)"
    },
    {
        real: "How far would you walk in the rain before giving up? (km)",
        imposter: "How far could you hike before needing a proper rest? (km)"
    },
    {
        real: "How far should a perfect scenic walk be? (km)",
        imposter: "How far would you travel for the best restaurant you've ever visited? (km)"
    },
    {
        real: "How far should a perfect scenic walk be? (km)",
        imposter: "How far would you drive for a concert you really wanted to see? (km)"
    },
    {
        real: "How far would you travel for a one-night stay somewhere amazing? (km)",
        imposter: "How far should a comfortable daily walk be? (km)"
    },
    {
        real: "How far would you travel for a one-night stay somewhere amazing? (km)",
        imposter: "How far could you swim without stopping? (metres)"
    },
    {
        real: "How far could you sprint before needing to stop? (metres)",
        imposter: "How far would you cycle for a perfect day out? (km)"
    },
    {
        real: "How far could you sprint before needing to stop? (metres)",
        imposter: "How far would you walk to save £10? (km)"
    },
    {
        real: "How far would you go to find the best pizza in town? (km)",
        imposter: "How far away should your ideal holiday destination be? (km)"
    },
    {
        real: "How far would you go to find the best pizza in town? (km)",
        imposter: "How far should a good neighbourhood walking route be? (km)"
    },
    {
        real: "How far should a school trip feel before it becomes a journey? (km)",
        imposter: "How far would you run to catch a bus? (metres)"
    },
    {
        real: "How far should a school trip feel before it becomes a journey? (km)",
        imposter: "How far would you travel to visit your favourite person? (km)"
    },
    {
        real: "How many days would your perfect holiday last?",
        imposter: "How many days should a good family reunion last?"
    },
    {
        real: "How many days would your perfect holiday last?",
        imposter: "How many days should a summer holiday feel like?"
    },
    {
        real: "How long could you happily go without social media? (days)",
        imposter: "How many days could you stay in a hotel without getting bored?"
    },
    {
        real: "How long could you happily go without social media? (days)",
        imposter: "How many days would you spend travelling around a country?"
    },
    {
        real: "How many days would you spend visiting a huge city?",
        imposter: "How many days would you want for a dream honeymoon?"
    },
    {
        real: "How many days would you spend visiting a huge city?",
        imposter: "How many days could you go without checking the news?"
    },
    {
        real: "How many days should a school break feel like?",
        imposter: "How many days could you go without buying anything?"
    },
    {
        real: "How many days should a school break feel like?",
        imposter: "How many days would be enough for the perfect beach trip?"
    },
    {
        real: "How many days would you need for the perfect road trip?",
        imposter: "How many days should you spend exploring a theme-park resort?"
    },
    {
        real: "How many days would you need for the perfect road trip?",
        imposter: "How many days should a good city break last?"
    },
    {
        real: "How many days could you go without eating your favourite food?",
        imposter: "How many days would you want to spend camping?"
    },
    {
        real: "How many days could you go without eating your favourite food?",
        imposter: "How many days could you wear your favourite outfit before needing a change?"
    },
    {
        real: "How many days would you spend at a music festival?",
        imposter: "How many days should a summer holiday feel like?"
    },
    {
        real: "How many days would you spend at a music festival?",
        imposter: "How many days would you want to spend at your dream sporting event?"
    },
    {
        real: "How many days should a good family reunion last?",
        imposter: "How many days would you spend travelling around a country?"
    },
    {
        real: "How many days should a good family reunion last?",
        imposter: "How many days could you go without playing your favourite game?"
    },
    {
        real: "How many days could you stay in a hotel without getting bored?",
        imposter: "How many days could you go without checking the news?"
    },
    {
        real: "How many days could you stay in a hotel without getting bored?",
        imposter: "How many days should a big family trip last?"
    },
    {
        real: "How many days would you want for a dream honeymoon?",
        imposter: "How many days would be enough for the perfect beach trip?"
    },
    {
        real: "How many days would you want for a dream honeymoon?",
        imposter: "How many days would you spend on a once-in-a-lifetime adventure?"
    },
    {
        real: "How many days could you go without buying anything?",
        imposter: "How many days should a good city break last?"
    },
    {
        real: "How many days could you go without buying anything?",
        imposter: "How many days could you survive with only the food already in your kitchen?"
    },
    {
        real: "How many days should you spend exploring a theme-park resort?",
        imposter: "How many days could you wear your favourite outfit before needing a change?"
    },
    {
        real: "How many days should you spend exploring a theme-park resort?",
        imposter: "How many days would you want to explore a giant theme park?"
    },
    {
        real: "How many days would you want to spend camping?",
        imposter: "How many days would you want to spend at your dream sporting event?"
    },
    {
        real: "How many days would you want to spend camping?",
        imposter: "How many days would your perfect holiday last?"
    },
    {
        real: "How many days should a summer holiday feel like?",
        imposter: "How many days could you go without playing your favourite game?"
    },
    {
        real: "How many days should a summer holiday feel like?",
        imposter: "How long could you happily go without social media? (days)"
    },
    {
        real: "How many days would you spend travelling around a country?",
        imposter: "How many days should a big family trip last?"
    },
    {
        real: "How many days would you spend travelling around a country?",
        imposter: "How many days would you spend visiting a huge city?"
    },
    {
        real: "How many days could you go without checking the news?",
        imposter: "How many days would you spend on a once-in-a-lifetime adventure?"
    },
    {
        real: "How many days could you go without checking the news?",
        imposter: "How many days should a school break feel like?"
    },
    {
        real: "How many days would be enough for the perfect beach trip?",
        imposter: "How many days could you survive with only the food already in your kitchen?"
    },
    {
        real: "How many days would be enough for the perfect beach trip?",
        imposter: "How many days would you need for the perfect road trip?"
    },
    {
        real: "How many days should a good city break last?",
        imposter: "How many days would you want to explore a giant theme park?"
    },
    {
        real: "How many days should a good city break last?",
        imposter: "How many days could you go without eating your favourite food?"
    },
    {
        real: "How many days could you wear your favourite outfit before needing a change?",
        imposter: "How many days would your perfect holiday last?"
    },
    {
        real: "How many days could you wear your favourite outfit before needing a change?",
        imposter: "How many days would you spend at a music festival?"
    },
    {
        real: "How many days would you want to spend at your dream sporting event?",
        imposter: "How long could you happily go without social media? (days)"
    },
    {
        real: "How many days would you want to spend at your dream sporting event?",
        imposter: "How many days should a good family reunion last?"
    },
    {
        real: "How many days could you go without playing your favourite game?",
        imposter: "How many days would you spend visiting a huge city?"
    },
    {
        real: "How many days could you go without playing your favourite game?",
        imposter: "How many days could you stay in a hotel without getting bored?"
    },
    {
        real: "How many days should a big family trip last?",
        imposter: "How many days should a school break feel like?"
    },
    {
        real: "How many days should a big family trip last?",
        imposter: "How many days would you want for a dream honeymoon?"
    },
    {
        real: "How many days would you spend on a once-in-a-lifetime adventure?",
        imposter: "How many days would you need for the perfect road trip?"
    },
    {
        real: "How many days would you spend on a once-in-a-lifetime adventure?",
        imposter: "How many days could you go without buying anything?"
    },
    {
        real: "How many days could you survive with only the food already in your kitchen?",
        imposter: "How many days could you go without eating your favourite food?"
    },
    {
        real: "How many days could you survive with only the food already in your kitchen?",
        imposter: "How many days should you spend exploring a theme-park resort?"
    },
    {
        real: "How many days would you want to explore a giant theme park?",
        imposter: "How many days would you spend at a music festival?"
    },
    {
        real: "How many days would you want to explore a giant theme park?",
        imposter: "How many days would you want to spend camping?"
    },
    {
        real: "How many times a week would you happily eat pizza?",
        imposter: "How many times a month would you visit your favourite restaurant?"
    },
    {
        real: "How many times a week would you happily eat pizza?",
        imposter: "How many times a week would you go for a long walk?"
    },
    {
        real: "How often would you go to the cinema in a month if tickets were free?",
        imposter: "How often would you meet friends in an ideal month?"
    },
    {
        real: "How often would you go to the cinema in a month if tickets were free?",
        imposter: "How often would you eat dessert in an ideal week?"
    },
    {
        real: "How many times a month would you order takeaway if money were no issue?",
        imposter: "How many times a week would you order coffee if someone else paid?"
    },
    {
        real: "How many times a month would you order takeaway if money were no issue?",
        imposter: "How many times a month would you go shopping just for fun?"
    },
    {
        real: "How often should someone call their grandparents in a month?",
        imposter: "How often would you have a movie night in a month?"
    },
    {
        real: "How often should someone call their grandparents in a month?",
        imposter: "How often would you call your best friend in a week?"
    },
    {
        real: "How many times a week would you exercise if you loved it?",
        imposter: "How many times a week would you bake something if you enjoyed baking?"
    },
    {
        real: "How many times a week would you exercise if you loved it?",
        imposter: "How many times a month would you book a hotel weekend?"
    },
    {
        real: "How many times a month would you go to a concert if tickets were affordable?",
        imposter: "How often would you travel somewhere new in a month?"
    },
    {
        real: "How many times a month would you go to a concert if tickets were affordable?",
        imposter: "How often would you have friends over in a month?"
    },
    {
        real: "How often would you want a lie-in in a week?",
        imposter: "How many times a week would you go for a long walk?"
    },
    {
        real: "How often would you want a lie-in in a week?",
        imposter: "How many times a week would you play board games?"
    },
    {
        real: "How many times a month would you visit your favourite restaurant?",
        imposter: "How often would you eat dessert in an ideal week?"
    },
    {
        real: "How many times a month would you visit your favourite restaurant?",
        imposter: "How often would you visit a museum in a year?"
    },
    {
        real: "How often would you meet friends in an ideal month?",
        imposter: "How many times a month would you go shopping just for fun?"
    },
    {
        real: "How often would you meet friends in an ideal month?",
        imposter: "How many times a month would you try a completely new food?"
    },
    {
        real: "How many times a week would you order coffee if someone else paid?",
        imposter: "How often would you call your best friend in a week?"
    },
    {
        real: "How many times a week would you order coffee if someone else paid?",
        imposter: "How often would you watch a live sport in a month?"
    },
    {
        real: "How often would you have a movie night in a month?",
        imposter: "How many times a month would you book a hotel weekend?"
    },
    {
        real: "How often would you have a movie night in a month?",
        imposter: "How many times a week would you have breakfast out if you could?"
    },
    {
        real: "How many times a week would you bake something if you enjoyed baking?",
        imposter: "How often would you have friends over in a month?"
    },
    {
        real: "How many times a week would you bake something if you enjoyed baking?",
        imposter: "How often would you plan a surprise for someone in a month?"
    },
    {
        real: "How often would you travel somewhere new in a month?",
        imposter: "How many times a week would you play board games?"
    },
    {
        real: "How often would you travel somewhere new in a month?",
        imposter: "How many times a week would you happily eat pizza?"
    },
    {
        real: "How many times a week would you go for a long walk?",
        imposter: "How often would you visit a museum in a year?"
    },
    {
        real: "How many times a week would you go for a long walk?",
        imposter: "How often would you go to the cinema in a month if tickets were free?"
    },
    {
        real: "How often would you eat dessert in an ideal week?",
        imposter: "How many times a month would you try a completely new food?"
    },
    {
        real: "How often would you eat dessert in an ideal week?",
        imposter: "How many times a month would you order takeaway if money were no issue?"
    },
    {
        real: "How many times a month would you go shopping just for fun?",
        imposter: "How often would you watch a live sport in a month?"
    },
    {
        real: "How many times a month would you go shopping just for fun?",
        imposter: "How often should someone call their grandparents in a month?"
    },
    {
        real: "How often would you call your best friend in a week?",
        imposter: "How many times a week would you have breakfast out if you could?"
    },
    {
        real: "How often would you call your best friend in a week?",
        imposter: "How many times a week would you exercise if you loved it?"
    },
    {
        real: "How many times a month would you book a hotel weekend?",
        imposter: "How often would you plan a surprise for someone in a month?"
    },
    {
        real: "How many times a month would you book a hotel weekend?",
        imposter: "How many times a month would you go to a concert if tickets were affordable?"
    },
    {
        real: "How often would you have friends over in a month?",
        imposter: "How many times a week would you happily eat pizza?"
    },
    {
        real: "How often would you have friends over in a month?",
        imposter: "How often would you want a lie-in in a week?"
    },
    {
        real: "How many times a week would you play board games?",
        imposter: "How often would you go to the cinema in a month if tickets were free?"
    },
    {
        real: "How many times a week would you play board games?",
        imposter: "How many times a month would you visit your favourite restaurant?"
    },
    {
        real: "How often would you visit a museum in a year?",
        imposter: "How many times a month would you order takeaway if money were no issue?"
    },
    {
        real: "How often would you visit a museum in a year?",
        imposter: "How often would you meet friends in an ideal month?"
    },
    {
        real: "How many times a month would you try a completely new food?",
        imposter: "How often should someone call their grandparents in a month?"
    },
    {
        real: "How many times a month would you try a completely new food?",
        imposter: "How many times a week would you order coffee if someone else paid?"
    },
    {
        real: "How often would you watch a live sport in a month?",
        imposter: "How many times a week would you exercise if you loved it?"
    },
    {
        real: "How often would you watch a live sport in a month?",
        imposter: "How often would you have a movie night in a month?"
    },
    {
        real: "How many times a week would you have breakfast out if you could?",
        imposter: "How many times a month would you go to a concert if tickets were affordable?"
    },
    {
        real: "How many times a week would you have breakfast out if you could?",
        imposter: "How many times a week would you bake something if you enjoyed baking?"
    },
    {
        real: "How often would you plan a surprise for someone in a month?",
        imposter: "How often would you want a lie-in in a week?"
    },
    {
        real: "How often would you plan a surprise for someone in a month?",
        imposter: "How often would you travel somewhere new in a month?"
    },
    {
        real: "Name a person you'd want answering the phone if you were having a terrible day.",
        imposter: "Name a person you'd be surprised to see calling you late at night."
    },

    {
        real: "Name a person you'd choose to sit next to at a wedding.",
        imposter: "Name a person you'd recognise immediately in a crowded airport."
    },

    {
        real: "Name a person you'd want helping you decorate your dream room.",
        imposter: "Name a person you'd expect to have strong opinions about your room."
    },

    {
        real: "Name a person you'd choose to take on a long train journey.",
        imposter: "Name a person you'd probably end up talking to on a long train journey."
    },

    {
        real: "Name a person you'd ask to take a great photo of you.",
        imposter: "Name a person you'd be nervous about taking an important photo of you."
    },

    {
        real: "Name a person you'd choose to run a restaurant with.",
        imposter: "Name a person you'd expect to cause chaos in a restaurant."
    },

    {
        real: "Name a person you'd want beside you at a football match.",
        imposter: "Name a person you'd expect to be loud at a football match."
    },

    {
        real: "Name a person you'd invite to a surprise birthday dinner.",
        imposter: "Name a person you'd expect to accidentally reveal a surprise."
    },

    {
        real: "Name a person you'd choose to help you pack for a holiday.",
        imposter: "Name a person you'd expect to forget something important on a holiday."
    },

    {
        real: "Name a person you'd want with you if you got lost in a new city.",
        imposter: "Name a person you'd expect to get lost in a new city."
    },

    {
        real: "Name a person you'd pick to choose the music at a party.",
        imposter: "Name a person you'd recognise from hearing their music taste."
    },

    {
        real: "Name a person you'd want beside you on a roller coaster.",
        imposter: "Name a person you'd expect to scream on a roller coaster."
    },

    {
        real: "Name a person you'd choose to teach you something new.",
        imposter: "Name a person you'd expect to learn something new from you."
    },

    {
        real: "Name a person you'd invite to a fancy dinner.",
        imposter: "Name a person you'd expect to arrive overdressed to dinner."
    },

    {
        real: "Name a person you'd choose to help plan a holiday.",
        imposter: "Name a person you'd expect to change the holiday plans at the last minute."
    },

    {
        real: "Name a person you'd want sitting in the front row of your performance.",
        imposter: "Name a person you'd notice immediately in an audience."
    },

    {
        real: "Name a person you'd choose to be your partner in a quiz.",
        imposter: "Name a person you'd expect to know a surprising amount about random topics."
    },

    {
        real: "Name a person you'd invite on a road trip.",
        imposter: "Name a person you'd expect to ask 'Are we there yet?' on a road trip."
    },

    {
        real: "Name a person you'd want helping you choose a new hairstyle.",
        imposter: "Name a person you'd expect to notice if you changed your hairstyle."
    },

    {
        real: "Name a person you'd choose to be in your group photo.",
        imposter: "Name a person you'd expect to make everyone laugh while taking the group photo."
    },

    {
        real: "Name something you'd be proud to display in your bedroom.",
        imposter: "Name something you'd be annoyed to discover someone had put in your bedroom."
    },

    {
        real: "Name something you'd pack first for a weekend away.",
        imposter: "Name something you'd be annoyed to realise you'd forgotten on a weekend away."
    },

    {
        real: "Name something you'd want to find in an old attic.",
        imposter: "Name something you'd be worried about finding in an old attic."
    },

    {
        real: "Name something you'd happily keep as a souvenir.",
        imposter: "Name something you'd regret buying as a souvenir."
    },

    {
        real: "Name something you'd put on your desk at school or work.",
        imposter: "Name something you'd hate to spill on your desk at school or work."
    },

    {
        real: "Name something you'd take to a deserted island.",
        imposter: "Name something you'd panic about losing on a deserted island."
    },

    {
        real: "Name something you'd be excited to find in your hotel room.",
        imposter: "Name something you'd immediately complain about finding in your hotel room."
    },

    {
        real: "Name something you'd save from your room if you had to leave quickly.",
        imposter: "Name something you'd forget about completely while leaving in a hurry."
    },

    {
        real: "Name something you'd happily have engraved with your name.",
        imposter: "Name something you'd find embarrassing to have your name engraved on."
    },

    {
        real: "Name something you'd bring to a picnic.",
        imposter: "Name something you'd be annoyed to discover you'd left in the car at a picnic."
    },

    {
        real: "Name a film you'd put on when you want to relax.",
        imposter: "Name a film you'd be surprised to watch with your family."
    },

    {
        real: "Name a film you'd recommend to someone who had never seen a great film.",
        imposter: "Name a film you'd struggle to explain the plot of to someone else."
    },

    {
        real: "Name a TV show you'd binge over a weekend.",
        imposter: "Name a TV show you'd accidentally watch five episodes of."
    },

    {
        real: "Name a song you'd put on to improve the mood at a party.",
        imposter: "Name a song you'd recognise instantly from the first few seconds."
    },

    {
        real: "Name a song you'd choose for the final song of a party.",
        imposter: "Name a song you'd be annoyed to hear played three times in one night."
    },

    {
        real: "Name a place you'd choose for a perfect afternoon.",
        imposter: "Name a place you'd find frustrating to spend an afternoon."
    },

    {
        real: "Name a place you'd visit if you had a completely free day.",
        imposter: "Name a place you'd avoid if you had a completely free day."
    },

    {
        real: "Name a place you'd like to wake up tomorrow.",
        imposter: "Name a place you'd hate to discover you'd booked for tomorrow."
    },

    {
        real: "Name a place you'd choose for a first date.",
        imposter: "Name a place where you'd feel awkward running into someone you know."
    },

    {
        real: "Name a place you'd happily spend three hours waiting around.",
        imposter: "Name a place where three hours would feel painfully long."
    },

    {
        real: "Name a food you'd be happy to eat at midnight.",
        imposter: "Name a food you'd be annoyed to smell at midnight."
    },

    {
        real: "Name a food you'd serve at a big celebration.",
        imposter: "Name a food that would cause an argument at a big celebration."
    },

    {
        real: "Name a food you'd choose for a road trip.",
        imposter: "Name a food you'd regret keeping in a hot car during a road trip."
    },

    {
        real: "Name a food you'd order if you were trying somewhere completely new.",
        imposter: "Name a food you'd hesitate to order if you were trying somewhere completely new."
    },

    {
        real: "Name an animal you'd love to see up close.",
        imposter: "Name an animal you'd be very surprised to see outside your window."
    },

    {
        real: "Name an animal you'd choose to have for a day.",
        imposter: "Name an animal you'd be worried about meeting while alone."
    },

    {
        real: "Name a fictional character you'd want on your side in an adventure.",
        imposter: "Name a fictional character you'd expect to make an adventure much more difficult."
    },

    {
        real: "Name a fictional character you'd invite to a party.",
        imposter: "Name a fictional character you'd expect to cause a scene at a party."
    },

    {
        real: "Name an object you'd want as a lucky charm.",
        imposter: "Name an object you'd hate to find in your pocket by accident."
    },

    {
        real: "Name an object you'd keep forever even if it had no practical use.",
        imposter: "Name an object you'd get rid of immediately if it took up too much space."
    },

    {
        real: "Name a person you'd take on a spontaneous road trip.",
        imposter: "Name a person you'd expect to recognise your voice immediately."
    },
    {
        real: "Name a person you'd ask to take a photo of you on holiday.",
        imposter: "Name a person you'd expect to notice if you changed your hairstyle."
    },
    {
        real: "Name a person you'd choose to sit beside at a wedding.",
        imposter: "Name a person you'd expect to be memorable at a wedding."
    },
    {
        real: "Name a person you'd invite to a late-night takeaway.",
        imposter: "Name a person you'd expect to stay awake until sunrise."
    },
    {
        real: "Name a person you'd want on your team for a school quiz.",
        imposter: "Name a person you'd expect to know a bizarre amount about one random topic."
    },
    {
        real: "Name a person you'd call if you accidentally locked yourself out.",
        imposter: "Name a person you'd expect to still have a spare key somewhere."
    },
    {
        real: "Name a person you'd choose to plan a birthday day out with.",
        imposter: "Name a person you'd expect to have an unusual birthday tradition."
    },
    {
        real: "Name a person you'd want beside you on a long train journey.",
        imposter: "Name a person you'd expect to start a conversation with a stranger on a train."
    },
    {
        real: "Name a person you'd ask for a recommendation for a new show.",
        imposter: "Name a person you'd expect to have watched something nobody else has heard of."
    },
    {
        real: "Name a person you'd invite to a barbecue.",
        imposter: "Name a person you'd expect to arrive carrying something nobody asked for."
    },
    {
        real: "Name a person you'd ask to choose the snacks for movie night.",
        imposter: "Name a person you'd expect to finish the snacks before the film starts."
    },
    {
        real: "Name a person you'd choose to be your partner in an escape room.",
        imposter: "Name a person you'd expect to get distracted by a completely unnecessary clue."
    },
    {
        real: "Name a person you'd want helping you pack for a holiday.",
        imposter: "Name a person you'd expect to forget something on a holiday."
    },
    {
        real: "Name a person you'd choose to sit next to at a concert.",
        imposter: "Name a person you'd expect to know every word to the songs."
    },
    {
        real: "Name a person you'd ask to help decorate a room.",
        imposter: "Name a person you'd expect to turn decorating into a competition."
    },
    {
        real: "Name a person you'd choose to be with on a rainy day with no plans.",
        imposter: "Name a person you'd expect to suggest something completely random to do."
    },
    {
        real: "Name a person you'd ask to pick a restaurant for your group.",
        imposter: "Name a person you'd expect to order the strangest thing on the menu."
    },
    {
        real: "Name a person you'd want on a beach day.",
        imposter: "Name a person you'd expect to go swimming first."
    },
    {
        real: "Name a person you'd invite on a camping trip.",
        imposter: "Name a person you'd expect to bring far too much equipment."
    },
    {
        real: "Name a person you'd ask to help choose a gift.",
        imposter: "Name a person you'd expect to remember everyone's birthdays."
    },
    {
        real: "Name a person you'd choose to sit beside on a coach journey.",
        imposter: "Name a person you'd expect to fall asleep within ten minutes of the journey."
    },
    {
        real: "Name a person you'd want to meet for breakfast.",
        imposter: "Name a person you'd expect to order something completely different from everyone else."
    },
    {
        real: "Name a person you'd choose for a team photo.",
        imposter: "Name a person you'd expect to make everyone laugh while taking it."
    },
    {
        real: "Name a person you'd call first with surprisingly good news.",
        imposter: "Name a person you'd expect to ask a hundred questions about it."
    },
    {
        real: "Name a person you'd choose to help you move house.",
        imposter: "Name a person you'd expect to find a forgotten box from years ago in the process."
    },
    {
        real: "Name something you'd pack first for a weekend away.",
        imposter: "Name something you'd be annoyed to discover was missing from your room."
    },
    {
        real: "Name something you'd put on your bedside table.",
        imposter: "Name something you'd notice immediately if it disappeared from your desk."
    },
    {
        real: "Name something you'd keep in your school or work bag.",
        imposter: "Name something you'd worry about leaving behind in a café."
    },
    {
        real: "Name something you'd bring to a picnic.",
        imposter: "Name something you'd accidentally leave in the car after a picnic."
    },
    {
        real: "Name something you'd take to a theme park.",
        imposter: "Name something you'd regret carrying around a theme park all day."
    },
    {
        real: "Name something you'd want in a hotel room.",
        imposter: "Name something you'd be surprised to find in a hotel room."
    },
    {
        real: "Name something you'd keep in your car.",
        imposter: "Name something you'd notice if you suddenly couldn't find it in your car."
    },
    {
        real: "Name something you'd put in a time capsule.",
        imposter: "Name something you'd hope someone would recognise in a time capsule years later."
    },
    {
        real: "Name something you'd take to a deserted island.",
        imposter: "Name something you'd hate to discover was the only thing in your suitcase."
    },
    {
        real: "Name something you'd bring to a sleepover.",
        imposter: "Name something you'd realise you had forgotten when everyone was already asleep."
    },
    {
        real: "Name something you'd put on a birthday wishlist.",
        imposter: "Name something you'd be disappointed to unwrap at your birthday."
    },
    {
        real: "Name something you'd keep even if it had no practical use.",
        imposter: "Name something you'd be tempted to throw away during a big clear-out."
    },
    {
        real: "Name something you'd display on a shelf.",
        imposter: "Name something you'd accidentally knock off that shelf."
    },
    {
        real: "Name something you'd want beside you during a long journey.",
        imposter: "Name something you'd be annoyed to hear making noise during a long journey."
    },
    {
        real: "Name something you'd take to a concert.",
        imposter: "Name something you'd realise you should have left at home before entering the venue."
    },
    {
        real: "Name something you'd put in a lunchbox.",
        imposter: "Name something you'd hate to discover had leaked inside your bag."
    },
    {
        real: "Name something you'd buy for a new bedroom.",
        imposter: "Name something you'd probably forget to measure before buying for a new bedroom."
    },
    {
        real: "Name something you'd want near a sofa.",
        imposter: "Name something that would be extremely inconvenient to find under your sofa."
    },
    {
        real: "Name something you'd take to a sleepover at a friend's house.",
        imposter: "Name something you'd panic about leaving at a friend's house."
    },
    {
        real: "Name something you'd keep next to your computer.",
        imposter: "Name something you'd notice if it stopped working while you were busy."
    },
    {
        real: "Name something you'd take to the beach.",
        imposter: "Name something you'd hate to get covered in sand at the beach."
    },
    {
        real: "Name something you'd keep in a coat pocket.",
        imposter: "Name something you'd be confused to find in your coat pocket."
    },
    {
        real: "Name something you'd want in a survival kit.",
        imposter: "Name something you'd be surprised to see included in a survival kit."
    },
    {
        real: "Name something you'd bring to a house party.",
        imposter: "Name something you'd regret bringing if nobody used it."
    },
    {
        real: "Name something you'd keep in a drawer for years.",
        imposter: "Name something you'd rediscover while cleaning a drawer."
    },
    {
        real: "Name a place you'd choose for a first date.",
        imposter: "Name a place you'd expect to have a surprisingly long queue."
    },
    {
        real: "Name a place you'd spend a free afternoon.",
        imposter: "Name a place you'd expect to hear someone arguing."
    },
    {
        real: "Name a place you'd love to wake up tomorrow.",
        imposter: "Name a place you'd find very strange to wake up tomorrow."
    },
    {
        real: "Name a place you'd choose for a birthday.",
        imposter: "Name a place you'd never expect to find a birthday cake."
    },
    {
        real: "Name a place you'd go to clear your head.",
        imposter: "Name a place where you think you'd accidentally lose track of time."
    },
    {
        real: "Name a place you'd take a visiting friend.",
        imposter: "Name a place you'd expect your friend to remember afterwards."
    },
    {
        real: "Name a place you'd happily spend an entire day.",
        imposter: "Name a place where an hour would probably feel very long."
    },
    {
        real: "Name a place you'd go for a great view.",
        imposter: "Name a place where you'd expect the view to be completely different at night."
    },
    {
        real: "Name a place you'd choose for a picnic.",
        imposter: "Name a place where a picnic would be unexpectedly difficult."
    },
    {
        real: "Name a place you'd visit on a rainy day.",
        imposter: "Name a place you'd be surprised to enjoy in bad weather."
    },
    {
        real: "Name a place you'd go if you wanted to be surrounded by people.",
        imposter: "Name a place where you'd expect to recognise somebody you know."
    },
    {
        real: "Name a place you'd choose for a weekend away.",
        imposter: "Name a place you'd expect to have unusual opening hours."
    },
    {
        real: "Name a place you'd explore with a free afternoon.",
        imposter: "Name a place you'd expect to find something you weren't looking for."
    },
    {
        real: "Name a place you'd love to visit at night.",
        imposter: "Name a place you'd rather visit early in the morning."
    },
    {
        real: "Name a place you'd choose for a group photo.",
        imposter: "Name a place where you'd expect a group photo to be difficult."
    },
    {
        real: "Name a place you'd go for your favourite dessert.",
        imposter: "Name a place where you'd expect dessert to be served in a strange way."
    },
    {
        real: "Name a place you'd choose to study.",
        imposter: "Name a place where you'd be distracted almost immediately."
    },
    {
        real: "Name a place you'd go if you had an unexpected day off.",
        imposter: "Name a place where you would probably spend more money than planned."
    },
    {
        real: "Name a place you'd choose to watch a match.",
        imposter: "Name a place where you'd expect the atmosphere to be louder than the match itself."
    },
    {
        real: "Name a place you'd take someone who had never visited your town.",
        imposter: "Name a place a visitor might find unexpectedly interesting."
    },
    {
        real: "Name a place you'd want to spend Christmas.",
        imposter: "Name a place where Christmas would feel completely different."
    },
    {
        real: "Name a place you'd go if you wanted to find inspiration.",
        imposter: "Name a place where you'd expect to see something unusual."
    },
    {
        real: "Name a place you'd choose for a quiet meal.",
        imposter: "Name a place where you'd expect a very noisy table nearby."
    },
    {
        real: "Name a place you'd go when you wanted to browse without buying anything.",
        imposter: "Name a place where you'd accidentally leave with something anyway."
    },
    {
        real: "Name a place you'd choose to spend the final evening of a holiday.",
        imposter: "Name a place where you'd expect to remember the final evening for a long time."
    },
    {
        real: "Name a film you'd put on when you don't know what else to watch.",
        imposter: "Name a film you'd recognise from a single screenshot."
    },
    {
        real: "Name a film you'd show to someone who says they hate films.",
        imposter: "Name a film you'd find difficult to explain without spoiling it."
    },
    {
        real: "Name a TV show you'd binge over a weekend.",
        imposter: "Name a TV show you'd accidentally watch while doing something else."
    },
    {
        real: "Name a song you'd play to lift the mood.",
        imposter: "Name a song you'd recognise from the first two seconds."
    },
    {
        real: "Name a song you'd choose for a road trip.",
        imposter: "Name a song you'd expect everyone in the car to sing along to."
    },
    {
        real: "Name a film you'd watch on a plane.",
        imposter: "Name a film you'd rather not watch on a plane."
    },
    {
        real: "Name a TV character you'd invite to dinner.",
        imposter: "Name a TV character you'd expect to dominate the conversation."
    },
    {
        real: "Name a film you'd rewatch for the soundtrack.",
        imposter: "Name a film you'd remember mainly for one scene."
    },
    {
        real: "Name a song you'd put on at the end of a party.",
        imposter: "Name a song you'd be surprised to hear at a wedding."
    },
    {
        real: "Name a show you'd recommend to your best friend.",
        imposter: "Name a show you'd be curious to see someone else react to."
    },
    {
        real: "Name a film you'd watch on a lazy Sunday.",
        imposter: "Name a film you'd expect to make everyone stay awake."
    },
    {
        real: "Name a song you'd choose for karaoke.",
        imposter: "Name a song you'd expect to hear in a pub at closing time."
    },
    {
        real: "Name a TV show you'd watch with your family.",
        imposter: "Name a TV show you'd be awkward watching with your family."
    },
    {
        real: "Name a film you'd watch with no idea what it was about.",
        imposter: "Name a film whose title would make you curious immediately."
    },
    {
        real: "Name a song that belongs on a party playlist.",
        imposter: "Name a song that would make you check who made the playlist."
    },
    {
        real: "Name a film you'd take on a long train journey.",
        imposter: "Name a film that would make a long train journey feel shorter."
    },
    {
        real: "Name a TV show you'd start again from episode one.",
        imposter: "Name a TV show you'd expect to discover something new on a second watch."
    },
    {
        real: "Name a film you'd put on after a bad day.",
        imposter: "Name a film that would probably remind you of a specific person."
    },
    {
        real: "Name a song you'd associate with summer.",
        imposter: "Name a song you'd associate with a late-night drive."
    },
    {
        real: "Name a film you'd choose for a group movie night.",
        imposter: "Name a film you'd expect the group to argue about afterwards."
    },
    {
        real: "Name a song you'd never skip when it comes on.",
        imposter: "Name a song you'd expect people to sing even if they didn't know all the words."
    },
    {
        real: "Name a TV show you'd watch if you had one free hour.",
        imposter: "Name a TV show you'd accidentally turn into a three-hour session."
    },
    {
        real: "Name a film you'd recommend because of its ending.",
        imposter: "Name a film you'd recommend because of its opening scene."
    },
    {
        real: "Name a song you'd choose for a dramatic entrance.",
        imposter: "Name a song you'd choose for a dramatic exit."
    },
    {
        real: "Name a film you'd like to see on a huge cinema screen.",
        imposter: "Name a film you'd probably quote afterwards."
    },
    {
        real: "Name a food you'd happily eat after midnight.",
        imposter: "Name a food you'd expect to smell immediately when you walk into a kitchen."
    },
    {
        real: "Name a food you'd take on a road trip.",
        imposter: "Name a food you'd regret keeping in a hot car."
    },
    {
        real: "Name a food you'd order at a celebration.",
        imposter: "Name a food you'd expect everyone at the table to steal from each other."
    },
    {
        real: "Name a food you'd choose for a lazy Sunday.",
        imposter: "Name a food you'd associate with a busy morning."
    },
    {
        real: "Name a food you'd want at a picnic.",
        imposter: "Name a food you'd find awkward to eat at a picnic."
    },
    {
        real: "Name a food you'd try at a street market.",
        imposter: "Name a food you'd be curious to see turned into street food."
    },
    {
        real: "Name a dessert you'd order first if the menu allowed it.",
        imposter: "Name a dessert you'd expect to arrive looking completely different from the picture."
    },
    {
        real: "Name a snack you'd keep in your room.",
        imposter: "Name a snack you'd expect to disappear from your room without you noticing."
    },
    {
        real: "Name a drink you'd order with a special meal.",
        imposter: "Name a drink you'd associate with a very early morning."
    },
    {
        real: "Name a food you'd cook for friends.",
        imposter: "Name a food you'd rather someone else cooked for you."
    },
    {
        real: "Name a food you'd choose for a movie night.",
        imposter: "Name a food you'd be annoyed to hear crunching during a movie."
    },
    {
        real: "Name a food you'd bring to a party.",
        imposter: "Name a food you'd expect to be finished first at a party."
    },
    {
        real: "Name a food you'd eat on a beach day.",
        imposter: "Name a food you'd regret bringing to the beach because of the heat."
    },
    {
        real: "Name a food you'd put on a dream breakfast menu.",
        imposter: "Name a food you'd find strange to see served at breakfast."
    },
    {
        real: "Name a food you'd order if you were extremely hungry.",
        imposter: "Name a food you'd expect to be surprisingly filling."
    },
    {
        real: "Name a food you'd choose for a first date.",
        imposter: "Name a food you'd find awkward to eat on a first date."
    },
    {
        real: "Name a food you'd want in a packed lunch.",
        imposter: "Name a food you'd hate to open in a silent classroom."
    },
    {
        real: "Name a food you'd choose at a fair.",
        imposter: "Name a food you'd expect to have way too much sugar at a fair."
    },
    {
        real: "Name a food you'd want at a barbecue.",
        imposter: "Name a food you'd expect someone to accidentally burn at a barbecue."
    },
    {
        real: "Name a food you'd order if you had a free meal.",
        imposter: "Name a food you'd be willing to travel to another city to try."
    },
    {
        real: "Name a food you'd associate with winter.",
        imposter: "Name a food you'd associate with a very hot day."
    },
    {
        real: "Name a food you'd keep as a quick emergency meal.",
        imposter: "Name a food you'd expect to take the longest to prepare."
    },
    {
        real: "Name a food you'd want to learn to cook perfectly.",
        imposter: "Name a food you'd expect to require far more ingredients than it should."
    },
    {
        real: "Name a food you'd choose for a huge family dinner.",
        imposter: "Name a food you'd expect to cause the most debate about how it should be cooked."
    },
    {
        real: "Name a food you'd be happy to see on a hotel breakfast buffet.",
        imposter: "Name a food you'd be surprised to see on a hotel breakfast buffet."
    },
    {
        real: "Name an activity you'd do on a completely free day.",
        imposter: "Name an activity you'd expect to become competitive surprisingly quickly."
    },
    {
        real: "Name an activity you'd try on holiday.",
        imposter: "Name an activity you'd expect to leave you covered in mud."
    },
    {
        real: "Name an activity you'd do with friends on a rainy day.",
        imposter: "Name an activity you'd expect everyone to argue over the rules for."
    },
    {
        real: "Name an activity you'd like to get better at.",
        imposter: "Name an activity you'd expect to be harder than it looks."
    },
    {
        real: "Name an activity you'd choose for a first hangout with someone.",
        imposter: "Name an activity that would make an awkward silence much less awkward."
    },
    {
        real: "Name an activity you'd do if your phone battery died.",
        imposter: "Name an activity you'd forget you enjoyed until you had no internet."
    },
    {
        real: "Name an activity you'd choose for a Sunday morning.",
        imposter: "Name an activity you'd regret starting if you were already tired."
    },
    {
        real: "Name an activity you'd include in a perfect weekend.",
        imposter: "Name an activity you'd expect to lose track of time doing."
    },
    {
        real: "Name an activity you'd do at a sleepover.",
        imposter: "Name an activity you'd expect everyone to get louder at as the night goes on."
    },
    {
        real: "Name an activity you'd try once just for the experience.",
        imposter: "Name an activity you'd expect to be surprisingly addictive."
    },
    {
        real: "Name an activity you'd choose for a group competition.",
        imposter: "Name an activity where one tiny mistake could become very funny."
    },
    {
        real: "Name an activity you'd do outdoors in summer.",
        imposter: "Name an activity you'd still enjoy even if the weather changed suddenly."
    },
    {
        real: "Name an activity you'd do before a big night out.",
        imposter: "Name an activity that would make you late if you started it too late."
    },
    {
        real: "Name an activity you'd choose on a long train journey.",
        imposter: "Name an activity that would make a long train journey feel shorter."
    },
    {
        real: "Name an activity you'd do when you needed to think.",
        imposter: "Name an activity you'd find impossible to do while distracted."
    },
    {
        real: "Name an activity you'd recommend to someone feeling bored.",
        imposter: "Name an activity you'd expect them to keep doing after the boredom disappeared."
    },
    {
        real: "Name an activity you'd do with a younger sibling.",
        imposter: "Name an activity you'd expect them to beat you at."
    },
    {
        real: "Name an activity you'd do with a grandparent.",
        imposter: "Name an activity you'd expect to hear a funny story during."
    },
    {
        real: "Name an activity you'd choose for a date night.",
        imposter: "Name an activity you'd expect to reveal how competitive someone is."
    },
    {
        real: "Name an activity you'd do on a holiday morning.",
        imposter: "Name an activity you'd expect to take longer than planned."
    },
    {
        real: "Name an activity you'd choose if money didn't matter.",
        imposter: "Name an activity you'd expect to need a reservation for."
    },
    {
        real: "Name an activity you'd do in a city.",
        imposter: "Name an activity you'd expect to discover by accident while exploring."
    },
    {
        real: "Name an activity you'd choose for a group of strangers.",
        imposter: "Name an activity that would make everyone learn each other's personalities quickly."
    },
    {
        real: "Name an activity you'd do on your own for an hour.",
        imposter: "Name an activity you'd be surprised to discover you enjoy alone."
    },
    {
        real: "Name an activity you'd include in your dream birthday.",
        imposter: "Name an activity you'd expect to become the thing everyone talks about afterwards."
    },
    {
        real: "Name something you'd keep on a school or work desk.",
        imposter: "Name something you'd be annoyed to spill on a school or work desk."
    },
    {
        real: "Name something you'd take to an exam.",
        imposter: "Name something you'd hate to realise you'd forgotten before an exam."
    },
    {
        real: "Name something you'd write on a school or work noticeboard.",
        imposter: "Name something you'd expect people to ignore on a school or work noticeboard."
    },
    {
        real: "Name something you'd put in a presentation.",
        imposter: "Name something you'd be worried would go wrong during a presentation."
    },
    {
        real: "Name something you'd keep in a pencil case.",
        imposter: "Name something you'd expect to borrow from someone because you forgot yours."
    },
    {
        real: "Name something you'd bring to a group project.",
        imposter: "Name something you'd expect someone else in the group to forget."
    },
    {
        real: "Name something you'd put in your work bag.",
        imposter: "Name something you'd hope not to find broken in your work bag."
    },
    {
        real: "Name something you'd do during a study break.",
        imposter: "Name something you'd accidentally spend the entire study break doing."
    },
    {
        real: "Name something you'd put on a revision list.",
        imposter: "Name something you'd be tempted to leave until the last minute."
    },
    {
        real: "Name something you'd want on your first day at a new job.",
        imposter: "Name something you'd be surprised to be given on your first day at a new job."
    },
    {
        real: "Name something you'd put on a classroom wall.",
        imposter: "Name something you'd be distracted by on a classroom wall."
    },
    {
        real: "Name something you'd ask a teacher or colleague about.",
        imposter: "Name something you'd feel awkward bringing up with a teacher or colleague."
    },
    {
        real: "Name something you'd bring to an interview.",
        imposter: "Name something you'd wish you had checked before an interview."
    },
    {
        real: "Name something you'd use during a long meeting.",
        imposter: "Name something you'd notice everyone else doing during a long meeting."
    },
    {
        real: "Name something you'd put in a locker.",
        imposter: "Name something you'd be annoyed to find someone had left in your locker."
    },
    {
        real: "Name something you'd use to organise your week.",
        imposter: "Name something you'd forget to add to your weekly plan."
    },
    {
        real: "Name something you'd keep for future reference.",
        imposter: "Name something you'd accidentally delete while clearing old files."
    },
    {
        real: "Name something you'd use to make notes.",
        imposter: "Name something you'd lose at the exact moment you needed to make notes."
    },
    {
        real: "Name something you'd do before submitting important work.",
        imposter: "Name something you'd wish you had checked after submitting important work."
    },
    {
        real: "Name something you'd put in a lunch break.",
        imposter: "Name something you'd be tempted to do instead of returning to work immediately."
    },
    {
        real: "Name something you'd choose for a school or work celebration.",
        imposter: "Name something you'd expect someone to bring to a school or work celebration without being asked."
    },
    {
        real: "Name something you'd use to wake up before an early start.",
        imposter: "Name something you'd ignore when you were supposed to be awake."
    },
    {
        real: "Name something you'd keep near your front door.",
        imposter: "Name something you'd suddenly realise you had left somewhere when you were already outside."
    },
    {
        real: "Name something you'd prepare the night before a busy day.",
        imposter: "Name something you'd regret not preparing the night before a busy day."
    },
    {
        real: "Name something you'd use to keep track of important dates.",
        imposter: "Name something you'd forget even though it was written down."
    },
    {
        real: "Name something you'd take on a long flight.",
        imposter: "Name something you'd hope not to be seated next to on a long flight."
    },
    {
        real: "Name something you'd bring on a train journey.",
        imposter: "Name something you'd be annoyed to hear repeatedly on a train journey."
    },
    {
        real: "Name something you'd keep in a hotel safe.",
        imposter: "Name something you'd suddenly worry you had left behind in a hotel room."
    },
    {
        real: "Name something you'd do first after arriving in a new city.",
        imposter: "Name something you'd expect to spend too much time looking for in a new city."
    },
    {
        real: "Name a vehicle you'd choose for a road trip.",
        imposter: "Name a vehicle you'd expect to have a very unusual interior."
    },
    {
        real: "Name something you'd pack for a beach holiday.",
        imposter: "Name something you'd regret packing for a beach holiday."
    },
    {
        real: "Name something you'd want on a campsite.",
        imposter: "Name something you'd be surprised to discover already waiting on a campsite."
    },
    {
        real: "Name something you'd do at an airport before boarding.",
        imposter: "Name something you'd be annoyed to realise you had forgotten before boarding."
    },
    {
        real: "Name something you'd look for when choosing a hotel.",
        imposter: "Name something you'd notice immediately when entering a hotel room."
    },
    {
        real: "Name something you'd want during a delayed journey.",
        imposter: "Name something you'd find especially annoying during a delayed journey."
    },
    {
        real: "Name something you'd keep in a travel wallet.",
        imposter: "Name something you'd be worried about losing while travelling."
    },
    {
        real: "Name something you'd buy at an airport.",
        imposter: "Name something you'd be surprised to see being sold at an airport."
    },
    {
        real: "Name something you'd want in a hire car.",
        imposter: "Name something you'd want to check before driving a hire car."
    },
    {
        real: "Name something you'd do during a long coach trip.",
        imposter: "Name something you'd expect to become uncomfortable during a long coach trip."
    },
    {
        real: "Name something you'd take on a city break.",
        imposter: "Name something you'd regret not bringing on a city break."
    },
    {
        real: "Name something you'd choose for a dream hotel breakfast.",
        imposter: "Name something you'd expect to find in a strange hotel breakfast."
    },
    {
        real: "Name something you'd do when you first enter a hotel room.",
        imposter: "Name something you'd immediately notice if it was missing from the room."
    },
    {
        real: "Name something you'd bring on a mountain trip.",
        imposter: "Name something you'd hope the weather did not ruin on a mountain trip."
    },
    {
        real: "Name something you'd look up before visiting a new country.",
        imposter: "Name something you'd be surprised to discover was very different there."
    },
    {
        real: "Name something you'd do during a road-trip stop.",
        imposter: "Name something you'd expect to forget in the car when leaving the stop."
    },
    {
        real: "Name something you'd take onto a ferry.",
        imposter: "Name something you'd expect to see people carrying onto a ferry."
    },
    {
        real: "Name something you'd buy as a holiday souvenir.",
        imposter: "Name something you'd find at home and immediately remember a holiday by."
    },
    {
        real: "Name something you'd want on a night train.",
        imposter: "Name something you'd find difficult to sleep through on a night train."
    },
    {
        real: "Name something you'd choose as a travel companion.",
        imposter: "Name something you'd expect a travel companion to have strong opinions about."
    },
    {
        real: "Name something you'd check before leaving for the airport.",
        imposter: "Name something you'd still worry you had forgotten after checking everything."
    },
    {
        real: "Name something you'd put in your dream bedroom.",
        imposter: "Name something you'd notice first in someone else's bedroom."
    },
    {
        real: "Name something you'd want in a perfect kitchen.",
        imposter: "Name something you'd expect to be missing from a poorly designed kitchen."
    },
    {
        real: "Name something you'd keep beside a sofa.",
        imposter: "Name something you'd be annoyed to find underneath a sofa."
    },
    {
        real: "Name something you'd put on a balcony.",
        imposter: "Name something you'd be surprised to see on a balcony."
    },
    {
        real: "Name something you'd grow in a garden.",
        imposter: "Name something you'd be annoyed to find growing in your garden."
    },
    {
        real: "Name something you'd keep next to a bed.",
        imposter: "Name something you'd reach for if you woke up during the night."
    },
    {
        real: "Name something you'd display in a living room.",
        imposter: "Name something you'd expect guests to comment on in a living room."
    },
    {
        real: "Name something you'd want in a bathroom.",
        imposter: "Name something you'd hate to discover was broken in a bathroom."
    },
    {
        real: "Name something you'd hear during a storm.",
        imposter: "Name something you'd be relieved not to hear during a storm."
    },
    {
        real: "Name something you'd take outside on a sunny day.",
        imposter: "Name something you'd suddenly wish you had during a sunny day."
    },
    {
        real: "Name an animal you'd love to see in the wild.",
        imposter: "Name an animal you'd be very surprised to see in a garden."
    },
    {
        real: "Name an animal you'd choose to see at a zoo.",
        imposter: "Name an animal you'd expect to sleep for most of the day."
    },
    {
        real: "Name an animal you'd be happy to see on a farm.",
        imposter: "Name an animal you'd expect to make an unexpectedly loud noise."
    },
    {
        real: "Name an animal you'd choose as a mascot.",
        imposter: "Name an animal you'd expect to become a funny mascot."
    },
    {
        real: "Name an animal you'd want to photograph.",
        imposter: "Name an animal you'd expect to be difficult to photograph."
    },
    {
        real: "Name something you'd keep by the front door.",
        imposter: "Name something you'd forget to take with you when leaving the house."
    },
    {
        real: "Name something you'd use on a lazy morning.",
        imposter: "Name something you'd be surprised to find on your kitchen table in the morning."
    },
    {
        real: "Name something you'd light in the evening.",
        imposter: "Name something you'd notice if the power suddenly went out."
    },
    {
        real: "Name something you'd want during a heatwave.",
        imposter: "Name something you'd hate to have stop working during a heatwave."
    },
    {
        real: "Name something you'd wear on a cold morning.",
        imposter: "Name something you'd regret wearing when the weather suddenly warmed up."
    },
    {
        real: "Name something you'd take outside in heavy rain.",
        imposter: "Name something you'd be annoyed to discover was not waterproof."
    },
    {
        real: "Name something you'd keep for a house guest.",
        imposter: "Name something you'd expect a house guest to accidentally use."
    },
    {
        real: "Name something you'd put on a coffee table.",
        imposter: "Name something you'd be annoyed to see left on a coffee table."
    },
    {
        real: "Name something you'd want in a quiet reading corner.",
        imposter: "Name something that would ruin a quiet reading corner."
    },
    {
        real: "Name something you'd hear in a busy house.",
        imposter: "Name something you'd notice immediately if it suddenly stopped making noise."
    },
    {
        real: "Name a nickname you could imagine giving a friend.",
        imposter: "Name a nickname you'd be surprised to hear at a family gathering."
    },
    {
        real: "Name a word you'd happily put on a T-shirt.",
        imposter: "Name a word you'd find strange written on a restaurant wall."
    },
    {
        real: "Name a name you'd consider for a pet.",
        imposter: "Name a name you'd expect to hear shouted across a playground."
    },
    {
        real: "Name a fictional character you'd invite to a party.",
        imposter: "Name a fictional character you'd expect to accidentally cause a problem at a party."
    },
    {
        real: "Name something you'd put in a scrapbook.",
        imposter: "Name something you'd expect someone to keep as a strange souvenir."
    },
    {
        real: "Name a colour you'd choose for a bedroom.",
        imposter: "Name a colour you'd notice immediately on a sports car."
    },
    {
        real: "Name a sound you'd enjoy hearing while relaxing.",
        imposter: "Name a sound you'd instantly recognise in a crowded place."
    },
    {
        real: "Name a phrase you'd use when someone has surprised you.",
        imposter: "Name a phrase you'd expect someone to say after making a silly mistake."
    },
    {
        real: "Name something you'd write in a birthday card.",
        imposter: "Name something you'd regret writing in a birthday card."
    },
    {
        real: "Name something you'd keep as a lucky charm.",
        imposter: "Name something you'd be curious to find in an old pocket."
    },
    {
        real: "Name a fictional place you'd want to visit.",
        imposter: "Name a fictional place you'd expect to be dangerous after dark."
    },
    {
        real: "Name a game you'd play at a party.",
        imposter: "Name a game you'd expect to become far too competitive."
    },
    {
        real: "Name a hobby you'd like to try.",
        imposter: "Name a hobby you'd expect to become expensive surprisingly quickly."
    },
    {
        real: "Name an item you'd put in a museum display about your life.",
        imposter: "Name an item someone might wrongly assume was important to you."
    },
    {
        real: "Name a smell you'd associate with childhood.",
        imposter: "Name a smell you'd notice immediately when entering a new house."
    },
    {
        real: "Name something you'd put on a vision board.",
        imposter: "Name something you'd be surprised to see on someone else's vision board."
    },
    {
        real: "Name a phrase you'd put on a poster.",
        imposter: "Name a phrase you'd find odd on a restaurant menu."
    },
    {
        real: "Name something you'd save from a memorable day.",
        imposter: "Name something you'd discover years later and instantly remember that day."
    },
    {
        real: "Name a fictional job you'd try for a day.",
        imposter: "Name a real job you'd expect to involve something completely unexpected."
    },
    {
        real: "Name something you'd write on a bucket list.",
        imposter: "Name something you'd be tempted to cross off a bucket list earlier than planned."
    },
    {
        real: "Name a sound you'd use to describe a cartoon character.",
        imposter: "Name a sound you'd recognise even if you couldn't see where it came from."
    },
    {
        real: "Name an object that would make a funny trophy.",
        imposter: "Name an object that would look strange as a trophy."
    },
    {
        real: "Name a word that sounds like a person's name.",
        imposter: "Name a person's name that sounds like it could be a place."
    },
    {
        real: "Name something you'd want to be famous for.",
        imposter: "Name something you'd be worried about becoming famous for."
    },
    {
        real: "Name something you'd change about your room for one day.",
        imposter: "Name something you'd notice if someone secretly changed in your room."
    }
];


// =====================================
// ROOMS
// =====================================

const rooms = new Map();


// =====================================
// HELPER FUNCTIONS
// =====================================

function cleanName(name) {

    return String(name || "")
        .trim()
        .slice(0, 20) || "Player";
}


function cleanAnswer(answer) {

    return String(answer || "")
        .trim()
        .slice(0, 300);
}


function generateRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code;

    do {

        code = "";

        for (let i = 0; i < 6; i++) {

            code +=
                characters[
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                ];
        }

    } while (rooms.has(code));

    return code;
}


// =====================================
// PUBLIC ROOM STATE
// =====================================

function getPublicRoomState(room) {

    return {

        roomCode:
            room.code,

        hostId:
            room.hostId,

        status:
            room.status,

        players:
            Array.from(
                room.players.values()
            ).map(player => ({

                id:
                    player.id,

                name:
                    player.name,

                isHost:
                    player.id === room.hostId
            }))
    };
}


function broadcastRoomState(room) {

    io.to(room.code).emit(
        "roomState",
        getPublicRoomState(room)
    );
}


function sendError(socket, message) {

    socket.emit(
        "errorMessage",
        message
    );
}


// =====================================
// ANSWER PROGRESS
// =====================================

function broadcastAnswerProgress(room) {

    io.to(room.code).emit(
        "answerProgress",
        {

            submitted:
                room.answers.size,

            total:
                room.players.size
        }
    );
}


function allPlayersAnswered(room) {

    if (room.players.size === 0) {
        return false;
    }


    for (
        const playerId
        of room.players.keys()
    ) {

        if (
            !room.answers.has(
                playerId
            )
        ) {
            return false;
        }
    }


    return true;
}


// =====================================
// START VOTING
// =====================================

function startVoting(room) {

    if (
        room.status !==
        "answering"
    ) {
        return;
    }


    room.status =
        "voting";


    const answers = [];


    for (
        const player
        of room.players.values()
    ) {

        answers.push({

            id:
                player.id,

            name:
                player.name,

            answer:
                room.answers.get(
                    player.id
                ) || ""
        });
    }


    io.to(room.code).emit(
        "answersReady",
        {
            answers
        }
    );


    broadcastRoomState(room);
}


// =====================================
// VOTE COUNTS
// =====================================

function getVoteCounts(room) {

    const counts = {};


    for (
        const player
        of room.players.values()
    ) {

        counts[player.id] =
            0;
    }


    for (
        const votedFor
        of room.votes.values()
    ) {

        if (
            Object.prototype.hasOwnProperty.call(
                counts,
                votedFor
            )
        ) {

            counts[votedFor]++;
        }
    }


    return counts;
}


function broadcastVoteUpdate(room) {

    io.to(room.code).emit(
        "voteUpdate",
        {

            counts:
                getVoteCounts(room),

            votedCount:
                room.votes.size,

            total:
                room.players.size
        }
    );
}


function allPlayersVoted(room) {

    if (room.players.size === 0) {
        return false;
    }


    for (
        const playerId
        of room.players.keys()
    ) {

        if (
            !room.votes.has(
                playerId
            )
        ) {

            return false;
        }
    }


    return true;
}


// =====================================
// FINISH VOTING
// =====================================

function finishVoting(room) {

    if (
        room.status !==
        "voting"
    ) {
        return;
    }


    const counts =
        getVoteCounts(room);


    /*
        Build final results.

        Example:

        {
            name: "Sam",
            votes: 2,
            voters: ["Alex", "Jordan"]
        }
    */

    const results =
        Array.from(
            room.players.values()
        ).map(player => {

            const voters =
                Array.from(
                    room.votes.entries()
                )
                .filter(
                    ([voterId, votedForId]) =>
                        votedForId ===
                        player.id
                )
                .map(
                    ([voterId]) => {

                        const voter =
                            room.players.get(
                                voterId
                            );

                        return voter
                            ? voter.name
                            : null;
                    }
                )
                .filter(Boolean);


            return {

                id:
                    player.id,

                name:
                    player.name,

                votes:
                    counts[player.id] || 0,

                voters
            };
        });


    room.status =
        "revealed";


    const imposter =
        room.players.get(
            room.imposterId
        );


    io.to(room.code).emit(
        "gameRevealed",
        {

            realQuestion:
                room.question.real,

            imposterName:
                imposter
                    ? imposter.name
                    : "Unknown",

            imposterId:
                room.imposterId,

            results
        }
    );


    broadcastRoomState(room);
}


// =====================================
// REMOVE PLAYER FROM ROOM
// =====================================

function removePlayer(socket) {

    const roomCode =
        socket.roomCode;


    if (!roomCode) {
        return;
    }


    const room =
        rooms.get(roomCode);


    /*
        Clear the socket's roomCode immediately.

        This is important because it allows
        the same person to create or join
        another room after leaving.
    */

    socket.roomCode = null;


    if (!room) {
        return;
    }


    // Remove player
    room.players.delete(
        socket.id
    );


    // Remove their answer
    room.answers.delete(
        socket.id
    );


    // Remove their vote
    room.votes.delete(
        socket.id
    );


    // ---------------------------------
    // ROOM EMPTY
    // ---------------------------------

    if (
        room.players.size === 0
    ) {

        rooms.delete(
            roomCode
        );

        console.log(
            `Room ${roomCode} deleted`
        );

        return;
    }


    // ---------------------------------
    // NEW HOST
    // ---------------------------------

    if (
        room.hostId === socket.id
    ) {

        const nextPlayer =
            room.players
                .values()
                .next()
                .value;


        room.hostId =
            nextPlayer.id;
    }


    // ---------------------------------
    // UPDATE ROOM
    // ---------------------------------

    broadcastRoomState(
        room
    );


    // ---------------------------------
    // ANSWERING PHASE
    // ---------------------------------

    if (
        room.status ===
        "answering"
    ) {

        broadcastAnswerProgress(
            room
        );


        /*
            If the person who left was
            the final person needed to
            submit, move to voting.
        */

        if (
            allPlayersAnswered(
                room
            )
        ) {

            startVoting(
                room
            );
        }
    }


    // ---------------------------------
    // VOTING PHASE
    // ---------------------------------

    if (
        room.status ===
        "voting"
    ) {

        broadcastVoteUpdate(
            room
        );


        /*
            If the person who left was
            the final person needed to
            vote, finish the round.
        */

        if (
            allPlayersVoted(
                room
            )
        ) {

            finishVoting(
                room
            );
        }
    }
}


// =====================================
// SOCKET CONNECTION
// =====================================

io.on(
    "connection",
    socket => {

        console.log(
            "Connected:",
            socket.id
        );


        // =================================
        // CREATE ROOM
        // =================================

        socket.on(
            "createRoom",
            ({ name }) => {

                /*
                    IMPORTANT:

                    There is NO lockout here.

                    A player can leave a room
                    and create another room later.
                */


                if (
                    socket.roomCode
                ) {

                    sendError(
                        socket,
                        "You are already in a room."
                    );

                    return;
                }


                const playerName =
                    cleanName(name);


                const roomCode =
                    generateRoomCode();


                const room = {

                    code:
                        roomCode,

                    hostId:
                        socket.id,

                    status:
                        "lobby",

                    question:
                        null,

                    imposterId:
                        null,

                    players:
                        new Map(),

                    answers:
                        new Map(),

                    votes:
                        new Map()
                };


                room.players.set(
                    socket.id,
                    {

                        id:
                            socket.id,

                        name:
                            playerName
                    }
                );


                rooms.set(
                    roomCode,
                    room
                );


                socket.join(
                    roomCode
                );


                socket.roomCode =
                    roomCode;


                socket.emit(
                    "roomCreated",
                    getPublicRoomState(
                        room
                    )
                );


                broadcastRoomState(
                    room
                );


                console.log(
                    `${playerName} created room ${roomCode}`
                );
            }
        );


        // =================================
        // JOIN ROOM
        // =================================

        socket.on(
            "joinRoom",
            ({ roomCode, name }) => {

                /*
                    IMPORTANT:

                    There is NO lockout here either.
                */


                if (
                    socket.roomCode
                ) {

                    sendError(
                        socket,
                        "You are already in a room."
                    );

                    return;
                }


                const code =
                    String(
                        roomCode || ""
                    )
                    .trim()
                    .toUpperCase();


                const room =
                    rooms.get(
                        code
                    );


                if (!room) {

                    sendError(
                        socket,
                        "That room does not exist."
                    );

                    return;
                }


                if (
                    room.status !==
                    "lobby"
                ) {

                    sendError(
                        socket,
                        "That game has already started."
                    );

                    return;
                }


                if (
                    room.players.size >=
                    MAX_PLAYERS
                ) {

                    sendError(
                        socket,
                        "That room is full."
                    );

                    return;
                }


                const playerName =
                    cleanName(name);


                // Prevent duplicate names
                const duplicateName =
                    Array.from(
                        room.players.values()
                    ).some(
                        player =>
                            player.name.toLowerCase() ===
                            playerName.toLowerCase()
                    );


                if (
                    duplicateName
                ) {

                    sendError(
                        socket,
                        "That name is already being used in this room."
                    );

                    return;
                }


                room.players.set(
                    socket.id,
                    {

                        id:
                            socket.id,

                        name:
                            playerName
                    }
                );


                socket.join(
                    code
                );


                socket.roomCode =
                    code;


                broadcastRoomState(
                    room
                );


                console.log(
                    `${playerName} joined room ${code}`
                );
            }
        );


        // =================================
        // START GAME
        // =================================

        socket.on(
            "startGame",
            () => {

                const room =
                    rooms.get(
                        socket.roomCode
                    );


                if (!room) {

                    sendError(
                        socket,
                        "You are not in a room."
                    );

                    return;
                }


                // Only host
                if (
                    room.hostId !==
                    socket.id
                ) {

                    sendError(
                        socket,
                        "Only the host can start the game."
                    );

                    return;
                }


                // Minimum players
                if (
                    room.players.size <
                    MIN_PLAYERS
                ) {

                    sendError(
                        socket,
                        `You need at least ${MIN_PLAYERS} players to start.`
                    );

                    return;
                }


                // Must be lobby
                if (
                    room.status !==
                    "lobby"
                ) {

                    sendError(
                        socket,
                        "The game has already started."
                    );

                    return;
                }


                const playerArray =
                    Array.from(
                        room.players.values()
                    );


                // ---------------------------------
                // RANDOM QUESTION
                // ---------------------------------

                room.question =
                    questions[
                        Math.floor(
                            Math.random() *
                            questions.length
                        )
                    ];


                // ---------------------------------
                // RANDOM IMPOSTER
                // ---------------------------------

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        playerArray.length
                    );


                room.imposterId =
                    playerArray[
                        randomIndex
                    ].id;


                // ---------------------------------
                // CLEAR OLD DATA
                // ---------------------------------

                room.answers.clear();

                room.votes.clear();


                room.status =
                    "answering";


                // ---------------------------------
                // SEND SECRET QUESTION
                // ---------------------------------

                for (
                    const player
                    of playerArray
                ) {

                    const isImposter =
                        player.id ===
                        room.imposterId;


                    const question =
                        isImposter
                            ? room.question.imposter
                            : room.question.real;


                    /*
                        IMPORTANT:

                        io.to(player.id)

                        sends the question ONLY
                        to that specific player.
                    */

                    io.to(
                        player.id
                    ).emit(
                        "gameStarted",
                        {

                            question,

                            playerName:
                                player.name
                        }
                    );
                }


                broadcastAnswerProgress(
                    room
                );


                broadcastRoomState(
                    room
                );


                console.log(
                    `Game started in room ${room.code}`
                );
            }
        );


        // =================================
        // SUBMIT ANSWER
        // =================================

        socket.on(
            "submitAnswer",
            ({ answer }) => {

                const room =
                    rooms.get(
                        socket.roomCode
                    );


                if (!room) {

                    sendError(
                        socket,
                        "You are not in a room."
                    );

                    return;
                }


                if (
                    room.status !==
                    "answering"
                ) {

                    sendError(
                        socket,
                        "You cannot submit an answer right now."
                    );

                    return;
                }


                if (
                    !room.players.has(
                        socket.id
                    )
                ) {

                    sendError(
                        socket,
                        "You are not a player in this room."
                    );

                    return;
                }


                // Don't allow double submission
                if (
                    room.answers.has(
                        socket.id
                    )
                ) {

                    sendError(
                        socket,
                        "You have already submitted your answer."
                    );

                    return;
                }


                const clean =
                    cleanAnswer(
                        answer
                    );


                if (!clean) {

                    sendError(
                        socket,
                        "Please type an answer first."
                    );

                    return;
                }


                room.answers.set(
                    socket.id,
                    clean
                );


                // Tell this player their answer was received
                socket.emit(
                    "answerSubmitted"
                );


                // Update progress
                broadcastAnswerProgress(
                    room
                );


                // Everyone has answered
                if (
                    allPlayersAnswered(
                        room
                    )
                ) {

                    startVoting(
                        room
                    );
                }
            }
        );


        // =================================
        // VOTE
        // =================================

        socket.on(
            "voteFor",
            ({ playerId }) => {

                const room =
                    rooms.get(
                        socket.roomCode
                    );


                if (!room) {

                    sendError(
                        socket,
                        "You are not in a room."
                    );

                    return;
                }


                if (
                    room.status !==
                    "voting"
                ) {

                    sendError(
                        socket,
                        "Voting is not active."
                    );

                    return;
                }


                // Already voted
                if (
                    room.votes.has(
                        socket.id
                    )
                ) {

                    sendError(
                        socket,
                        "You have already voted."
                    );

                    return;
                }


                // Make sure target exists
                if (
                    !room.players.has(
                        playerId
                    )
                ) {

                    sendError(
                        socket,
                        "That player does not exist."
                    );

                    return;
                }


                // Prevent voting for yourself
                if (
                    playerId ===
                    socket.id
                ) {

                    sendError(
                        socket,
                        "You cannot vote for yourself."
                    );

                    return;
                }


                // Store vote
                room.votes.set(
                    socket.id,
                    playerId
                );


                // Tell voter their vote worked
                socket.emit(
                    "voteSubmitted"
                );


                // Update live totals for everyone
                broadcastVoteUpdate(
                    room
                );


                // Everyone has voted
                if (
                    allPlayersVoted(
                        room
                    )
                ) {

                    finishVoting(
                        room
                    );
                }
            }
        );


        // =================================
        // PLAY AGAIN
        // =================================

        socket.on(
            "playAgain",
            () => {

                const room =
                    rooms.get(
                        socket.roomCode
                    );


                if (!room) {

                    sendError(
                        socket,
                        "You are not in a room."
                    );

                    return;
                }


                // Only host
                if (
                    room.hostId !==
                    socket.id
                ) {

                    sendError(
                        socket,
                        "Only the host can start another round."
                    );

                    return;
                }


                // Reset round
                room.status =
                    "lobby";

                room.question =
                    null;

                room.imposterId =
                    null;

                room.answers.clear();

                room.votes.clear();


                // Send everyone back to lobby
                io.to(
                    room.code
                ).emit(
                    "backToLobby"
                );


                broadcastRoomState(
                    room
                );


                console.log(
                    `Room ${room.code} is ready for another round`
                );
            }
        );


        // =================================
        // LEAVE ROOM
        // =================================

        socket.on(
            "leaveRoom",
            () => {

                const roomCode =
                    socket.roomCode;


                if (!roomCode) {
                    return;
                }


                /*
                    IMPORTANT:

                    Leaving ONLY removes the player
                    from the room.

                    There is NO BAN.

                    The player can immediately:
                    - create another room
                    - join another room
                    - rejoin this room later
                */

                socket.leave(
                    roomCode
                );


                removePlayer(
                    socket
                );


                console.log(
                    `Player ${socket.id} left room ${roomCode}`
                );
            }
        );


        // =================================
        // DISCONNECT
        // =================================

        socket.on(
            "disconnect",
            () => {

                console.log(
                    "Disconnected:",
                    socket.id
                );


                /*
                    If they close the browser,
                    disconnect, or lose connection,
                    remove them from their room.

                    This does NOT ban them.
                */

                removePlayer(
                    socket
                );
            }
        );
    }
);


// =====================================
// START SERVER
// =====================================

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Server running on port ${PORT}`
        );
    }
);
