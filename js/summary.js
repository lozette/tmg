
$(document).ready(function () {
	$('#main .nojs').addClass('hidden');
	$('#main .loading').removeClass('hidden');
	$.ajax({
		url: "data/summary.json",
		datatype: "jsonp",
		crossDomain: true,
		complete: function(data) {
			var result = $.parseJSON(data.responseText);
			var filmLink = result.filmLink;
			var iPath = result.imagePath;
			var html = "";

			if (result.numArticles > 0) {
				var html = "<p class='number'>" + result.numArticles + " film reviews found</p><ul class='results'>";
				var articles = result.reviewList;
				$.each(articles.reviewArticles, function() {
					html += "<li class='clear'><h3><a href='" + filmLink + this.reviewLink + "'>" + this.reviewTitle + "</a></h3><p class='details'>" + this.reviewAuthor + " | " + this.reviewDate + "</p>";
					if (this.reviewImage !== "") {
						html += "<img src='" + iPath + this.reviewImage + "' />";
					}
					html += "<p>" + this.reviewSummary + "</p><span class='rating stars" + this.reviewRating + "'>" + this.reviewRating + " stars</span></li>";
				});
				html += "</ul>";
			}
			else {
				html = "<p class='number'>No matching results found.</p>"
			}
			$('#main .content').empty().append(html);
			
		}
	});
});