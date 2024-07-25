describe("home page", () => {
  it("Validate submitting UploadSongForm with valid data", () => {
    cy.uploadSongFormTest({
      isValid: true,
      author: "Khói, Sofia, Châu Đăng Khoa",
      imageFilePath: "./public/Là do em xui thôi.jpg",
      mp3FilePath: "./public/Là do em xui thôi.mp3",
      title: "Là do em xui thôi",
    });
  });
  it("Validate Leaving the song title empty", () => {
    cy.uploadSongFormTest({
      isValid: false,
      author: "Khói, Sofia, Châu Đăng Khoa",
      imageFilePath: "./public/Là do em xui thôi.jpg",
      mp3FilePath: "./public/Là do em xui thôi.mp3",
    });
  });
});
