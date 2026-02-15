/**
 * Register Handlebars helpers
 */
export function registerHandlebarsHelpers() {
  
  // 같은지 비교
  Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
  });

  // 더하기
  Handlebars.registerHelper('add', function(a, b) {
    return parseInt(a) + parseInt(b);
  });

  // 빼기
  Handlebars.registerHelper('subtract', function(a, b) {
    return parseInt(a) - parseInt(b);
  });

  // 곱하기
  Handlebars.registerHelper('multiply', function(a, b) {
    return parseInt(a) * parseInt(b);
  });

  // 기능 보너스 계산
  Handlebars.registerHelper('skillBonus', function(level) {
    const bonuses = {
      'untrained': -4,
      'trained': 2,
      'skilled': 4,
      'advanced': 5,
      'expert': 6,
      'master': 7,
      'grandmaster': 8
    };
    return bonuses[level] || -4;
  });

  // 기능 등급 라벨
  Handlebars.registerHelper('skillLevelLabel', function(level) {
    const labels = {
      'untrained': '훈련 안됨',
      'trained': '훈련됨',
      'skilled': '숙련됨',
      'advanced': '진척됨',
      'expert': '정통함',
      'master': '박학함',
      'grandmaster': '대가'
    };
    return labels[level] || '훈련 안됨';
  });

  // 반복문 (times)
  Handlebars.registerHelper('times', function(n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });

  // 선택 옵션 생성
  Handlebars.registerHelper('select', function(selected, options) {
    return options.fn(this).replace(
      new RegExp(' value="' + selected + '"'),
      '$& selected="selected"'
    );
  });

  // JSON 출력
  Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
  });
}
