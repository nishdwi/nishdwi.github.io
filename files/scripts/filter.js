// code to pupulate filter in momentum results html file
// https://www.youtube.com/watch?v=tYdlt9q6Iug


function getUniqueValuesFromColumn(){
    
    var unique_col_values_dict = {}
    allFilters = document.querySelectorAll(".table-filter")
    
    allFilters.forEach((filter_i) => {   
        col_index = filter_i.parentElement.getAttribute("col-index");
        //alert(col_index)
        x = Number(col_index) + 1  //check if this adding 1 works. Yes, why?
        //console.log(typeof x)
        const rows = document.querySelectorAll("#mom_table > tbody > tr")
        rows.forEach((row) =>{
            //console.log(row.querySelector("td:nth-child("+x+")").innerHTML);
            cell_value = row.querySelector("td:nth-child("+x+")").innerHTML  //this line is failing
            //alert(cell_value)

            // if the column index is already present in the dict
            if(col_index in unique_col_values_dict){
                // if the value is already present in the array
                if (unique_col_values_dict[col_index].includes(cell_value)){

                }else{
                    unique_col_values_dict[col_index].push(cell_value)
                }
            }else{
                unique_col_values_dict[col_index]=new Array(cell_value)
            }

        });

    });

    for (i in unique_col_values_dict){
        //alert(" column index : "+ i + "has unique values : \n" + unique_col_values_dict[i]);
    }
    
    updateSelectOptions(unique_col_values_dict)

};

// add function to update select tags
function updateSelectOptions(unique_col_values_dict){
    allFilters = document.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index")
        
        unique_col_values_dict[col_index].forEach((i) =>{
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
            
        });

    });
};

//create filter rows function
function filterRows(){
    
    allFilters = document.querySelectorAll(".table-filter")
    var filter_value_dict = []

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')
        value = filter_i.value
        if (value != 'all'){
            filter_value_dict[col_index] = value;   
        }
        

    });
        
    
    var col_cell_value_dict = [];

    const rows = document.querySelectorAll("#mom_table > tbody > tr");
    rows.forEach((row) => {
        var display_row= true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute("col-index")
            y = Number(col_index) + 1 
            col_cell_value_dict[col_index] = row.querySelector("td:nth-child("+y+")").innerHTML
            
        })
        
        console.log(filter_value_dict)
        for (var col_i in filter_value_dict){
            filter_value = filter_value_dict[col_i]
            row_cell_value = col_cell_value_dict[col_i]

            if (row_cell_value.indexOf(filter_value)== -1 && filter_value != 'all'){
                display_row= false
                break;
            }
        }
        if(display_row == true){
            row.style.display = "table-row"

        }else{
            row.style.display = "none"

        }
    })
    

};