export default class CatalogSheetsGenerator {
  constructor(title, itemsArray) {
    this.title = title;
    this.itemsArray = itemsArray;
  }

  generate() {
    return this.itemsArray.reduce((markup, chunk, index) => {
      return `
        ${markup}
        <div class="catalog-sheet">
          <div class="catalog-sheet__wrapper">
            <div class="catalog-sheet__content">
              <div class="catalog-sheet__header">
                <div class="catalog-sheet__header-info">
                  <span>${index + 1}</span>
                  <span class="catalog-sheet__spacer"></span>
                  <span data-catalog-title><strong>${this.title}</strong></span>
                </div>
                <span>icebox.com</span>
              </div>
              <div class="catalog-sheet__grid">
							${chunk
                .map((item) => {
                  return `
                  <div class="catalog-item">
                    <div class="catalog-item__pic-wrap">
                      <img alt="" src="${item.src}" />
                    </div>
                    <div class="catalog-item__details">
                      <div class="catalog-item__title">
                        ${item.title}
                      </div>
                      <div class="catalog-item__subtitle">
                        ${item.description}
                      </div>
                      <div class="catalog-item__price">
                        <span class="dollar-sign">$</span>${item.price}
                      </div>
                    </div>
                  </div>
                `;
                })
                .join("")}
              </div>
              <div class="catalog-sheet__footer">
                <span>3255 Peachtree Road, NE Suite #2, Atlanta, GA, 30305, USA</span>
                <span>+ 1 (404) 842 02-66</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }, ``);
  }
  generatePlaceholder() {
    return `
			<div class="catalog-placeholder">
				<div>
					<div class="catalog-placeholder__item">
						<div>
							<div></div>
							<div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
					<div class="catalog-placeholder__item">
						<div>
							<div></div>
							<div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
					<div class="catalog-placeholder__item">
						<div>
							<div></div>
							<div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
					<span>Select collection...</span>
				</div>
			</div>
		`;
  }
}
