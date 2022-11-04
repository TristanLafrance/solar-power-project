This is my final project from my bootcamp !

The delay for this project was 2 weeks. 95% of the work was done in this time frame to meet the MVP, the rest was some CSS edit & adding comments.

The goal of this project was to create from scratch, a working front-end & back-end website, using:

- React
- Node.JS & Express.JS
- MongoDB


In this project, we answer two main questions:

1- How much electricity/money does your solar pannel produce ?

2- How much time to payback your solar pannel ?

What data & calculation did I use ? Let's take a look. 

For the first question witch is "How much electricity/money does your solar pannel produce ?" we need 4 variables.

- $/KwH paid
- Number of solar pannel
- Power of each solar pannel
- Average hours of sunlight

Here's the math for daily watts hour:

Average hours of sunlight x solar panel watts x 75% = daily watt-hours

To answer the questions we only need the output per day in kWh witch look like this

// Solar pannel system output in KwH/day

const systemOutputPerDay = (sunHour * (solarPannel * (power/1000)) * 0.75).toFixed(2)

For the second question witch is "How much time to payback your solar pannel ?" we need 5 variables.

- $/KwH paid
- Number of solar pannel
- Power of each solar pannel
- Average hours of sunlight
- Cost of the solar system

To answer the question "How much time to payback" we need to divide the cost by the amount the solar system makes per year.

const timePaybackYear = parseInt(cost / moneyPerYear)








