// Image timeline functionality
let images = [];
let currentImageIndex = 0;
let isPlaying = false;
let playInterval;

// Initialize the image viewer
async function initializeImageViewer() {
  // Generate list of images based on the files we know exist
  const imageFiles = [
    "0__20250314_182754_Aligned.webp", "1__20250315_095638_Aligned.webp", "2__20250317_104808_Aligned.webp",
    "3__20250319_131323_Aligned.webp", "4__20250320_140754_Aligned.webp", "5__20250322_122956_Aligned.webp",
    "6__20250324_092054_Aligned.webp", "7__20250325_095642_Aligned.webp", "8__20250326_094838_Aligned.webp",
    "9__20250329_112315_Aligned.webp", "10__20250330_134314_Aligned.webp", "11__20250331_091436_Aligned.webp",
    "12__20250402_084631_Aligned.webp", "13__20250406_133406_Aligned.webp", "14__20250407_132411_Aligned.webp",
    "15__20250408_174955_Aligned.webp", "16__20250409_093537_Aligned.webp", "17__20250411_114546_Aligned.webp",
    "18__20250412_082008_Aligned.webp", "19__20250415_091644_Aligned.webp", "20__20250417_140216_Aligned.webp",
    "21__20250418_074833_Aligned.webp", "22__20250419_140904_Aligned.webp", "23__20250420_143336_Aligned.webp",
    "24__20250421_114829_Aligned.webp", "25__20250423_102221_Aligned.webp", "26__20250424_160541_Aligned.webp",
    "27__20250425_113505_Aligned.webp", "28__20250426_155304_Aligned.webp", "29__20250427_120159_Aligned.webp",
    "30__20250428_091120_Aligned.webp", "31__20250429_140638_Aligned.webp", "32__20250430_141146_Aligned.webp",
    "33__20250501_142054_Aligned.webp", "34__20250502_150156_Aligned.webp", "35__20250503_111451_Aligned.webp",
    "36__20250507_144103_Aligned.webp", "37__20250508_092552_Aligned.webp", "38__20250509_084029_Aligned.webp",
    "39__20250510_161459_Aligned.webp", "40__20250511_122046_Aligned.webp", "41__20250512_084709_Aligned.webp",
    "42__20250513_055608_Aligned.webp", "43__20250520_155144_Aligned.webp", "44__20250523_145132_Aligned.webp",
    "45__20250524_093123_Aligned.webp", "46__20250525_084859_Aligned.webp", "47__20250526_093500_Aligned.webp",
    "48__20250527_103130_Aligned.webp", "49__20250528_124502_Aligned.webp", "50__20250529_133319_Aligned.webp",
    "51__20250530_132403_Aligned.webp", "52__20250531_134841_Aligned.webp", "53__20250601_074919_Aligned.webp",
    "54__20250602_142209_Aligned.webp", "55__20250603_094555_Aligned.webp", "56__20250604_080924_Aligned.webp",
    "57__20250605_140457_Aligned.webp", "58__20250606_074220_Aligned.webp", "59__20250607_081932_Aligned.webp",
    "60__20250608_093829_Aligned.webp", "61__20250609_112754_Aligned.webp", "62__20250610_132725_Aligned.webp",
    "63__20250611_164818_Aligned.webp", "64__20250613_095935_Aligned.webp", "65__20250613_171146_Aligned.webp",
    "66__20250614_193235_Aligned.webp", "67__20250615_103639_Aligned.webp", "68__20250616_133247_Aligned.webp",
    "69__20250617_104630_Aligned.webp", "70__20250628_155844_Aligned.webp", "71__20250629_162403_Aligned.webp",
    "72__20250701_133646_Aligned.webp", "73__20250702_124552_Aligned.webp", "74__20250703_151641_Aligned.webp",
    "75__20250705_153041_Aligned.webp", "76__20250706_121644_Aligned.webp", "77__20250707_103611_Aligned.webp",
    "78__20250708_092310_Aligned.webp", "79__20250709_141022_Aligned.webp", "80__20250710_102356_Aligned.webp",
    "81__20250711_124203_Aligned.webp", "82__20250712_081229_Aligned.webp", "83__20250713_115557_Aligned.webp",
    "84__20250714_163439_Aligned.webp", "85__20250715_084722_Aligned.webp", "86__20250716_120707_Aligned.webp",
    "87__20250717_133130_Aligned.webp", "88__20250718_071722_Aligned.webp", "89__20250719_152748_Aligned.webp",
    "90__20250720_121627_Aligned.webp", "91__20250721_090256_Aligned.webp", "92__20250722_124533_Aligned.webp",
    "93__20250723_151122_Aligned.webp", "94__20250724_075845_Aligned.webp", "95__20250725_131248_Aligned.webp",
    "96__20250726_173512_Aligned.webp", "97__20250727_131536_Aligned.webp", "98__20250728_175206_Aligned.webp",
    "99__20250729_095931_Aligned.webp", "100__20250730_104159_Aligned.webp", "101__20250731_132429_Aligned.webp",
    "102__20250801_091351_Aligned.webp", "103__20250802_101427_Aligned.webp", "104__20250804_105458_Aligned.webp",
    "105__20250805_130649_Aligned.webp", "106__20250806_141122_Aligned.webp", "107__20250807_104914_Aligned.webp",
    "108__20250808_081319_Aligned.webp"
  ];
  
  // Process image files and extract dates
  images = imageFiles.map((filename, index) => {
    const match = filename.match(/(\d+)__(\d{8})_(\d{6})_Aligned\.webp/);
    if (match) {
      const [, number, dateStr, timeStr] = match;
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const hour = timeStr.substring(0, 2);
      const minute = timeStr.substring(2, 4);
      const second = timeStr.substring(4, 6);
      
      const date = new Date(year, month - 1, day, hour, minute, second);
      
      return {
        filename: filename,
        path: `data/AlignedPhotos/${filename}`,
        date: date,
        dateString: `${month}/${day}/${year} ${hour}:${minute}:${second}`,
        number: parseInt(number)
      };
    }
    return null;
  }).filter(img => img !== null);
  
  // Sort by date (should already be in order, but just to be sure)
  images.sort((a, b) => a.date - b.date);
  
  // Set up the slider
  const slider = document.getElementById('timeline-slider');
  slider.max = images.length - 1;
  
  // Load the first image and start autoplay
  if (images.length > 0) {
    showImage(0);
    // Start autoplay after a short delay
    setTimeout(() => {
      togglePlayback();
    }, 1000);
  }
}

function showImage(index) {
  if (index < 0 || index >= images.length) return;
  
  currentImageIndex = index;
  const image = images[index];
  
  const imgElement = document.getElementById('timeline-image');
  imgElement.src = image.path;
  imgElement.style.display = 'block';
  imgElement.alt = `Trail photo from ${image.dateString}`;
  
  // Update slider
  document.getElementById('timeline-slider').value = index;
  
  // Update button states
  document.getElementById('prev-btn').disabled = index === 0;
  document.getElementById('next-btn').disabled = index === images.length - 1;
}

function previousImage() {
  if (currentImageIndex > 0) {
    showImage(currentImageIndex - 1);
  }
}

function nextImage() {
  if (currentImageIndex < images.length - 1) {
    showImage(currentImageIndex + 1);
  }
}

function onSliderChange(value) {
  const index = parseInt(value);
  showImage(index);
}

function togglePlayback() {
  const playBtn = document.getElementById('play-btn');
  
  if (isPlaying) {
    // Stop playback
    clearInterval(playInterval);
    isPlaying = false;
    playBtn.textContent = '▶ Play';
  } else {
    // Start playback
    isPlaying = true;
    playBtn.textContent = '⏸ Pause';
    
    playInterval = setInterval(() => {
      if (currentImageIndex < images.length - 1) {
        showImage(currentImageIndex + 1);
      } else {
        // End of images, restart from beginning
	showImage(0);
      }
    }, 150); // Change image every 500ms
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeImageViewer);
