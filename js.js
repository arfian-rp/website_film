$(document).ready(function () {
  $(".pencarian").keyup(function () {
    $.ajax({
      url: `http://www.omdbapi.com/?apikey=dca61bcc&s=${$(this).val()}`,
      success: (result) => {
        const film = result.Search;
        let cards = ``;
        film.forEach((k) => {
          cards += `<div class="col-sm-3 my-5">
                    <div class="card" style="width: 14rem; heigh: 45rem;">
                        <img src="${k.Poster}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${k.Title}</h5>
                            <h5 class="card-title">${k.Year}</h5>
                            <button type="button" class="btn btn-primary detail" data-toggle="modal" data-target="#exampleModal" data-imdb="${k.imdbID}">Detail</button>
                        </div>
                    </div>
                </div>`;
          $(".konten").html(cards);
          $(".jumbotron").hide();
          $(".detail").on("click", function () {
            $.ajax({
              url: `http://www.omdbapi.com/?apikey=dca61bcc&i=${$(this).data("imdb")}`,
              success: (m) => {
                const rating = m.Ratings[0];
                const modal = `<div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src="${m.Poster}" class="img-fluid">
                                    </div>
                                    <div class="col-md">
                                    <ul class="list-group">
                                        <li class="list-group-item">${m.Title}</li>
                                        <li class="list-group-item">tanggal rilis: ${m.Released}</li>
                                        <li class="list-group-item">durasi: ${m.Runtime}</li>
                                        <li class="list-group-item">Rating: ${rating.Value}</li>
                                        <li class="list-group-item">sutradara: ${m.Director}</li>
                                        <li class="list-group-item">genre: ${m.Genre}</li>
                                        <li class="list-group-item">penulis: ${m.Writer}</li>
                                        <li class="list-group-item">aktor: ${m.Actors}</li>
                                        <li class="list-group-item">plot: ${m.Plot}</li>
                                        <li class="list-group-item">bahasa: ${m.Language}</li>
                                        <li class="list-group-item">negara: ${m.Country}</li>
                                    </ul>
                                    </div>
                                </div>
                            </div>`;
                $(".modal-body").html(modal);
              },
            });
          });
        });
      },
      error: (e) => {
        console.log(e.responseText);
      },
    });
  });
});
