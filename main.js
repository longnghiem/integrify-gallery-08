const data = my_data,
  length_of_images = 7;
const gallery = document.getElementById("gallery");
let start_index = 0;

render();
// render images to the view:
//  length_of_images: number of images will be displayed
//  start_index: the index belongs to the first displayed item
function render() {
  gallery.innerHTML = "";
  for (let i = 0; i < length_of_images; i++) {
    let renderIndex = start_index + i;
    // example when index = 36 => index = 0.
    //              index = 42 => index = 6.
    if (renderIndex >= data.length) {
      renderIndex = renderIndex - data.length;
    }
    // console.log(renderIndex);
    renderItem(data[renderIndex], i);
  }
  // console.log("-----------");
}

//construct the DOM
function renderItem(profile, index_in_render_images) {

  const member = document.createElement("div");
  member.classList.add("member");

  const img_url = `photo/${profile.src}.webp`;
  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.setAttribute("src", img_url);

  member.append(avatar);
  gallery.append(member);
  //only content of the middle item  will be displayed
  const show_content = index_in_render_images === Math.floor(length_of_images / 2);
  if (show_content) {
    let skill_display = "<div class='member_skills'>";
    profile.skills.forEach(skill => {
      skill_display += "<label class='skill'>" + skill + "</label>"
    });
    skill_display += "</div>";
    document.getElementById("info").innerHTML =
      "<div class='member_name'><h1>" + profile.firstName + "</h1></div>" +
      "<blockquote class='member_quote'><p>" + profile.favoriteQuote + "</p></blockquote>"  +
      // "<div class='member_title'>" + profile.title + "</div>" +
      // "<div class='member_nationality'>" + profile.nationality + "</div>" +
      "<div class='member_whySofterDeveloper'><h3>I love software developer because:</h3>" + " "+profile.whySofterDeveloper + "</div>" +
      "<div class='member_longTermVision'><h3>Long term vision:</h3>" + " "+ profile.longTermVision + "</div>" +
      "<div class='member_motivatesMe'><h3>What motivate me:</h3>"+ " " + profile.motivatesMe + "</div>" +
      skill_display ;
  }

}

const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
function slideRight() {
  start_index = start_index === data.length - 1 ? 0 : start_index + 1;
  render();
}
function slideLeft() {
  start_index = start_index === 0 ? data.length - 1 : start_index - 1;
  render();
}

arrowRight.addEventListener("click", slideRight);
arrowLeft.addEventListener("click", slideLeft);
document.addEventListener("keydown", (event)=>{
  if (event.keyCode === 39) {
    slideRight();
  } else if (event.keyCode === 37){
    slideLeft();
  }
});
