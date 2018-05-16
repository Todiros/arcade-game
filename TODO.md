# PLAN

### **Game grid**
* probably rendered automatically once Player and Enemy are implemented
* 5 rows = grass, 4 x stone, grass

### **Enemy class**
* argument-less constructor
* private const variable with available rows (4)
* automatic speed generation 
* build
    * properties
    * constructor
    * update
    * render

### **Player class**
* input / character control
* lives
* score
* build
    * properties
    * constructor

### **Character class**
* image
* position
* movement 
    * update(dt)
* render

### **Collision**
* *TODO*

### **Styling**
* Mobile friendly
* Modal on loss
* 3 x Hearts at the bottom left
* Score on the top left
    * *based on time of completion*
