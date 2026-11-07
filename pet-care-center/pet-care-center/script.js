
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if(menuBtn && navLinks){
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("open"));
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if(a.getAttribute("href") === current) a.classList.add("active");
    a.addEventListener("click", () => navLinks?.classList.remove("open"));
  });

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const appointmentForm = document.getElementById("appointmentForm");
  const appointmentNotice = document.getElementById("appointmentNotice");
  if(appointmentForm){
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(appointmentForm).entries());
      const appointments = JSON.parse(localStorage.getItem("nausheenAppointments") || "[]");
      data.createdAt = new Date().toISOString();
      appointments.push(data);
      localStorage.setItem("nausheenAppointments", JSON.stringify(appointments));
      appointmentNotice.classList.add("show");
      appointmentNotice.textContent = `Thank you, ${data.ownerName}! Your appointment request for ${data.petName} has been recorded. Our clinic team will contact you to confirm the time.`;
      appointmentForm.reset();
    });
  }

  const contactForm = document.getElementById("contactForm");
  const contactNotice = document.getElementById("contactNotice");
  if(contactForm){
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactNotice.classList.add("show");
      contactNotice.textContent = "Thank you! Your message has been received. We will get back to you soon.";
      contactForm.reset();
    });
  }

  // Keep appointment date from accepting past dates.
  const dateInput = document.querySelector('input[type="date"]');
  if(dateInput){
    const today = new Date();
    dateInput.min = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().split("T")[0];
  }
});
