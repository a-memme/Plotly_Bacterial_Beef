# Plotly_Bacterial_Beef

## Summary
Visualizing belly button bacteria data with Plotly. A number of interactive graphs were created to display the demographic information of each study participant and the corresponding data pertaining to their washing frequency and bacteria prevalence. Using the dropdown menu, the user can interact with the data and choose amongst each participant to view their different sets of unique data.

## Notes
* Had troubles reversing the y-axis to display in descending order - tried a number of different code variations with no luck. Below I've attached what was happening when altering my code with the .reverse() function: i.e line 92: otuIdsString = otuSorted.map(otuId => "OTU" + otuId).reverse(). Y labels reversed, however their corresponding x values remained the same.*

![h-bar_reverse](https://user-images.githubusercontent.com/79600550/119290950-941d0200-bc1b-11eb-977c-4d82bb01a324.png)

![reverse_code](https://user-images.githubusercontent.com/79600550/119291053-ccbcdb80-bc1b-11eb-8587-0a631ef1feb0.png)
