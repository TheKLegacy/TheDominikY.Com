var e = (s) => document.getElementById(s);

function sortAlph() 
{
    e("projs").style.display = "block";
    e("date").style.display = "none";
    e("create").style.display = "none";
}

function sortDate() 
{
    e("projs").style.display = "none";
    e("date").style.display = "block";
    e("create").style.display = "none";
}

function sortCreate() 
{
    e("projs").style.display = "none";
    e("date").style.display = "none";
    e("create").style.display = "block";
}

function filter()
{
    var contentDivs = document.getElementsByClassName("container");
    var search = e("search").value;
    for(var i = 0; i < contentDivs.length; i++) 
    {
        contentDivs[i].style.display = (contentDivs[i].id == "" || contentDivs[i].id.indexOf(search) > -1) ? "block":"none";
    } 
}

sortAlph();