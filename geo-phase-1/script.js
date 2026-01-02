const width=window.innerWidth;
const height=window.innerHeight;
//To draw map on screen
const svg=d3.select("#map")
          .append("svg")
          .attr("viewBox",`0 0 ${width} ${height}`)
          .attr("preserveAspectRatio","xMidYMid meet")
//To project the map exactly in middle
const projection=d3.geoMercator()
    .scale(150)
    .translate([width/2,height/2]);

const PathGenerator=d3.geoPath().projection(projection);

//Fill all details
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class","country")
        .attr("d",PathGenerator)
        .on("click",function(event,d){
            //d is data for the country 
            //d.id is country code like IND for INDIA
            askForDetails(d.id);
        })
});

async function askForDetails(code){
    try{
        const res=await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data=await res.json();
    const country=data[0];

    document.getElementById("countryName").innerText=country.name.common;
    document.getElementById("capitalName").innerText=country.capital[0];
    document.getElementById("flagImg").src=country.flags.svg;

    const box=document.getElementById("infoBox")
    box.style.display="block";
    setTimeout(()=>{
        box.style.display="none";
    },3000)

    }catch(err){
        console.log("Error finding country",err);
        
    }
    
}

window.addEventListener("resize",()=>{
    //Get new screen sizes
    const newWidth=window.innerWidth;
    const newHeight=window.innerHeight;
    //Update SVG size and map projection
    svg.attr("width",newWidth).attr("height",newHeight);
    projection.translate([newWidth/2,newHeight/2])
                .scale(newWidth/7);
    //Redraw all countries in new space
    svg.selectAll("path").attr("d",PathGenerator);
})

const theme=document.getElementById("dark-theme")
theme.onclick=function(){
    const bodyEle=document.body;
    bodyEle.classList.toggle("dark-mode");
    if(bodyEle.classList.contains("dark-mode")){
        theme.innerHTML="<button>🌞</button>";
    }else{
        theme.innerHTML="<button>🌙</button>"
    }
}