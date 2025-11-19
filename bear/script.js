am5.ready(function() {

    // --- Data ---
    const allData = [
    // R05 (2023)
    { year: 2023, month: 4, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 5, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 1 },
    { year: 2023, month: 6, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 9, id: "JP-01", name: "北海道", incidents: 2, victims: 4, deaths: 1 },
    { year: 2023, month: 10, id: "JP-01", name: "北海道", incidents: 1, victims: 2, deaths: 0 },
    { year: 2023, month: 5, id: "JP-02", name: "青森県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 6, id: "JP-02", name: "青森県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 7, id: "JP-02", name: "青森県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 9, id: "JP-02", name: "青森県", incidents: 3, victims: 4, deaths: 0 },
    { year: 2023, month: 10, id: "JP-02", name: "青森県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2023, month: 4, id: "JP-03", name: "岩手県", incidents: 3, victims: 4, deaths: 0 },
    { year: 2023, month: 5, id: "JP-03", name: "岩手県", incidents: 5, victims: 5, deaths: 0 },
    { year: 2023, month: 6, id: "JP-03", name: "岩手県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2023, month: 7, id: "JP-03", name: "岩手県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2023, month: 8, id: "JP-03", name: "岩手県", incidents: 3, victims: 3, deaths: 1 },
    { year: 2023, month: 9, id: "JP-03", name: "岩手県", incidents: 8, victims: 8, deaths: 0 },
    { year: 2023, month: 10, id: "JP-03", name: "岩手県", incidents: 13, victims: 15, deaths: 1 },
    { year: 2023, month: 11, id: "JP-03", name: "岩手県", incidents: 5, victims: 5, deaths: 0 },
    { year: 2023, month: 12, id: "JP-03", name: "岩手県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 6, id: "JP-04", name: "宮城県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 10, id: "JP-04", name: "宮城県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 5, id: "JP-05", name: "秋田県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2023, month: 6, id: "JP-05", name: "秋田県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 7, id: "JP-05", name: "秋田県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2023, month: 8, id: "JP-05", name: "秋田県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2023, month: 9, id: "JP-05", name: "秋田県", incidents: 16, victims: 16, deaths: 0 },
    { year: 2023, month: 10, id: "JP-05", name: "秋田県", incidents: 26, victims: 34, deaths: 0 },
    { year: 2023, month: 11, id: "JP-05", name: "秋田県", incidents: 8, victims: 8, deaths: 0 },
    { year: 2023, month: 5, id: "JP-06", name: "山形県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 7, id: "JP-06", name: "山形県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 8, id: "JP-06", name: "山形県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 10, id: "JP-06", name: "山形県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 5, id: "JP-07", name: "福島県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2023, month: 6, id: "JP-07", name: "福島県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 7, id: "JP-07", name: "福島県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 8, id: "JP-07", name: "福島県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 9, id: "JP-07", name: "福島県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2023, month: 11, id: "JP-07", name: "福島県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 1, id: "JP-07", name: "福島県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 10, id: "JP-09", name: "栃木県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 5, id: "JP-10", name: "群馬県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 6, id: "JP-10", name: "群馬県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 10, id: "JP-10", name: "群馬県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 11, id: "JP-10", name: "群馬県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 7, id: "JP-15", name: "新潟県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 9, id: "JP-15", name: "新潟県", incidents: 3, victims: 4, deaths: 0 },
    { year: 2023, month: 10, id: "JP-15", name: "新潟県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 11, id: "JP-15", name: "新潟県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2023, month: 8, id: "JP-16", name: "富山県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 9, id: "JP-16", name: "富山県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 10, id: "JP-16", name: "富山県", incidents: 4, victims: 5, deaths: 1 },
    { year: 2023, month: 11, id: "JP-16", name: "富山県", incidents: 1, victims: 2, deaths: 0 },
    { year: 2023, month: 10, id: "JP-17", name: "石川県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 12, id: "JP-17", name: "石川県", incidents: 1, victims: 3, deaths: 0 },
    { year: 2023, month: 10, id: "JP-18", name: "福井県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 11, id: "JP-18", name: "福井県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 10, id: "JP-19", name: "山梨県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 11, id: "JP-19", name: "山梨県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 5, id: "JP-20", name: "長野県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 6, id: "JP-20", name: "長野県", incidents: 2, victims: 3, deaths: 0 },
    { year: 2023, month: 8, id: "JP-20", name: "長野県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2023, month: 9, id: "JP-20", name: "長野県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 10, id: "JP-20", name: "長野県", incidents: 1, victims: 1, deaths: 1 },
    { year: 2023, month: 11, id: "JP-20", name: "長野県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 7, id: "JP-21", name: "岐阜県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2023, month: 10, id: "JP-21", name: "岐阜県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2023, month: 11, id: "JP-21", name: "岐阜県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 7, id: "JP-24", name: "三重県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 8, id: "JP-26", name: "京都府", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 6, id: "JP-32", name: "島根県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 10, id: "JP-32", name: "島根県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2023, month: 3, id: "JP-32", name: "島根県", incidents: 1, victims: 1, deaths: 0 },

    // R06 (2024)
    { year: 2024, month: 5, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 7, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 5, id: "JP-02", name: "青森県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-02", name: "青森県", incidents: 2, victims: 2, deaths: 1 },
    { year: 2024, month: 8, id: "JP-02", name: "青森県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 4, id: "JP-03", name: "岩手県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 5, id: "JP-03", name: "岩手県", incidents: 2, victims: 2, deaths: 1 },
    { year: 2024, month: 6, id: "JP-03", name: "岩手県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 7, id: "JP-03", name: "岩手県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2024, month: 8, id: "JP-03", name: "岩手県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 9, id: "JP-03", name: "岩手県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 12, id: "JP-03", name: "岩手県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 5, id: "JP-05", name: "秋田県", incidents: 4, victims: 5, deaths: 0 },
    { year: 2024, month: 6, id: "JP-05", name: "秋田県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 7, id: "JP-05", name: "秋田県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 8, id: "JP-05", name: "秋田県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 10, id: "JP-05", name: "秋田県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-06", name: "山形県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 7, id: "JP-06", name: "山形県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 1, id: "JP-06", name: "山形県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-07", name: "福島県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 7, id: "JP-07", name: "福島県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 8, id: "JP-07", name: "福島県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 10, id: "JP-07", name: "福島県", incidents: 2, victims: 2, deaths: 1 },
    { year: 2024, month: 7, id: "JP-09", name: "栃木県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 10, id: "JP-09", name: "栃木県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 5, id: "JP-10", name: "群馬県", incidents: 1, victims: 2, deaths: 0 },
    { year: 2024, month: 9, id: "JP-10", name: "群馬県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 8, id: "JP-11", name: "埼玉県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 2, id: "JP-14", name: "神奈川県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 5, id: "JP-15", name: "新潟県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-15", name: "新潟県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 8, id: "JP-15", name: "新潟県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 10, id: "JP-15", name: "新潟県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 11, id: "JP-15", name: "新潟県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 6, id: "JP-16", name: "富山県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 4, id: "JP-17", name: "石川県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 5, id: "JP-17", name: "石川県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 10, id: "JP-17", name: "石川県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 7, id: "JP-19", name: "山梨県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 12, id: "JP-19", name: "山梨県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-20", name: "長野県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2024, month: 7, id: "JP-20", name: "長野県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 8, id: "JP-20", name: "長野県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 9, id: "JP-20", name: "長野県", incidents: 2, victims: 3, deaths: 0 },
    { year: 2024, month: 10, id: "JP-20", name: "長野県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 11, id: "JP-20", name: "長野県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-21", name: "岐阜県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2024, month: 9, id: "JP-21", name: "岐阜県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 8, id: "JP-24", name: "三重県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 9, id: "JP-26", name: "京都府", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 7, id: "JP-28", name: "兵庫県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 11, id: "JP-28", name: "兵庫県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 4, id: "JP-29", name: "奈良県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 10, id: "JP-32", name: "島根県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 6, id: "JP-33", name: "岡山県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 9, id: "JP-35", name: "山口県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 10, id: "JP-35", name: "山口県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2024, month: 11, id: "JP-35", name: "山口県", incidents: 1, victims: 1, deaths: 0 },

    // R07 (2025)
    { year: 2025, month: 4, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 1 },
    { year: 2025, month: 8, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 1 },
    { year: 2025, month: 9, id: "JP-01", name: "北海道", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-02", name: "青森県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 8, id: "JP-02", name: "青森県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 9, id: "JP-02", name: "青森県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2025, month: 4, id: "JP-03", name: "岩手県", incidents: 3, victims: 3, deaths: 0 },
    { year: 2025, month: 5, id: "JP-03", name: "岩手県", incidents: 2, victims: 3, deaths: 0 },
    { year: 2025, month: 6, id: "JP-03", name: "岩手県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2025, month: 7, id: "JP-03", name: "岩手県", incidents: 2, victims: 2, deaths: 1 },
    { year: 2025, month: 8, id: "JP-03", name: "岩手県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 9, id: "JP-03", name: "岩手県", incidents: 9, victims: 9, deaths: 0 },
    { year: 2025, month: 9, id: "JP-04", name: "宮城県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 5, id: "JP-05", name: "秋田県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 6, id: "JP-05", name: "秋田県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-05", name: "秋田県", incidents: 2, victims: 2, deaths: 1 },
    { year: 2025, month: 8, id: "JP-05", name: "秋田県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2025, month: 9, id: "JP-05", name: "秋田県", incidents: 10, victims: 11, deaths: 0 },
    { year: 2025, month: 7, id: "JP-06", name: "山形県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2025, month: 8, id: "JP-06", name: "山形県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2025, month: 9, id: "JP-06", name: "山形県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 5, id: "JP-07", name: "福島県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-07", name: "福島県", incidents: 2, victims: 3, deaths: 0 },
    { year: 2025, month: 8, id: "JP-07", name: "福島県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 9, id: "JP-07", name: "福島県", incidents: 3, victims: 4, deaths: 0 },
    { year: 2025, month: 6, id: "JP-09", name: "栃木県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-09", name: "栃木県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2025, month: 4, id: "JP-10", name: "群馬県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 8, id: "JP-10", name: "群馬県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 9, id: "JP-10", name: "群馬県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 8, id: "JP-13", name: "東京都", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 5, id: "JP-15", name: "新潟県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2025, month: 6, id: "JP-15", name: "新潟県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-15", name: "新潟県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 8, id: "JP-15", name: "新潟県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 9, id: "JP-15", name: "新潟県", incidents: 4, victims: 4, deaths: 0 },
    { year: 2025, month: 5, id: "JP-16", name: "富山県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-18", name: "福井県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 6, id: "JP-19", name: "山梨県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 8, id: "JP-19", name: "山梨県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 4, id: "JP-20", name: "長野県", incidents: 3, victims: 5, deaths: 0 },
    { year: 2025, month: 5, id: "JP-20", name: "長野県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 6, id: "JP-20", name: "長野県", incidents: 3, victims: 6, deaths: 1 },
    { year: 2025, month: 7, id: "JP-20", name: "長野県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 9, id: "JP-20", name: "長野県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2025, month: 9, id: "JP-21", name: "岐阜県", incidents: 2, victims: 2, deaths: 0 },
    { year: 2025, month: 4, id: "JP-25", name: "滋賀県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 6, id: "JP-25", name: "滋賀県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 5, id: "JP-28", name: "兵庫県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 6, id: "JP-29", name: "奈良県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-29", name: "奈良県", incidents: 1, victims: 1, deaths: 0 },
    { year: 2025, month: 7, id: "JP-34", name: "広島県", incidents: 1, victims: 1, deaths: 0 }
];

    // --- STATE & CONFIG ---
    let currentMetric = 'incidents';
    let currentTimeUnit = 'month';
    let lastAggregatedData = [];
    let sortState = { column: 'incidents', direction: 'desc' };

    // 都道府県名のマッピング（ローマ字→漢字）
    const prefectureNames = {
        'Hokkaido': '北海道',
        'Aomori': '青森県',
        'Iwate': '岩手県',
        'Miyagi': '宮城県',
        'Akita': '秋田県',
        'Yamagata': '山形県',
        'Fukushima': '福島県',
        'Ibaraki': '茨城県',
        'Tochigi': '栃木県',
        'Gunma': '群馬県',
        'Saitama': '埼玉県',
        'Chiba': '千葉県',
        'Tokyo': '東京都',
        'Kanagawa': '神奈川県',
        'Niigata': '新潟県',
        'Toyama': '富山県',
        'Ishikawa': '石川県',
        'Fukui': '福井県',
        'Yamanashi': '山梨県',
        'Nagano': '長野県',
        'Gifu': '岐阜県',
        'Shizuoka': '静岡県',
        'Aichi': '愛知県',
        'Mie': '三重県',
        'Shiga': '滋賀県',
        'Kyoto': '京都府',
        'Osaka': '大阪府',
        'Hyogo': '兵庫県',
        'Nara': '奈良県',
        'Wakayama': '和歌山県',
        'Tottori': '鳥取県',
        'Shimane': '島根県',
        'Okayama': '岡山県',
        'Hiroshima': '広島県',
        'Yamaguchi': '山口県',
        'Tokushima': '徳島県',
        'Kagawa': '香川県',
        'Ehime': '愛媛県',
        'Kochi': '高知県',
        'Fukuoka': '福岡県',
        'Saga': '佐賀県',
        'Nagasaki': '長崎県',
        'Kumamoto': '熊本県',
        'Oita': '大分県',
        'Miyazaki': '宮崎県',
        'Kagoshima': '鹿児島県',
        'Okinawa': '沖縄県'
    };

    const metricColors = {
        incidents: am5.color(0x3b82f6),
        victims: am5.color(0xf59e0b),
        deaths: am5.color(0xef4444)
    };
    const uniqueMonths = [...new Set(allData.map(d => `${d.year}-${String(d.month).padStart(2, '0')}`))].sort();
    const uniqueYears = [...new Set(allData.map(d => d.year))].sort();

    // --- UI Elements ---
    const tableDiv = document.getElementById('tablediv');
    const tableTitle = document.getElementById('table-title');
    const slider = document.getElementById('range-slider');
    const sliderValuesDiv = document.getElementById('slider-values');
    const metricButtons = document.querySelectorAll('.metric-btn');
    const timeUnitButtons = document.querySelectorAll('.time-unit-btn');
    const lineChartTitle = document.getElementById('linechart-title');

    // --- MAP CHART SETUP ---
    var mapRoot = am5.Root.new("chartdiv");
    mapRoot.setThemes([am5themes_Animated.new(mapRoot)]);
    var mapChart = mapRoot.container.children.push(am5map.MapChart.new(mapRoot, {
        projection: am5map.geoMercator(),
        wheelY: "zoom",
        maxZoomLevel: 16,
        panable: true // Use the simplest pan property
    }));
    var polygonSeries = mapChart.series.push(am5map.MapPolygonSeries.new(mapRoot, { geoJSON: am5geodata_japanLow, valueField: "value", calculateAggregates: true }));
    polygonSeries.mapPolygons.template.setAll({ tooltipText: "{name}: {value}", interactive: true });
    polygonSeries.mapPolygons.template.states.create("hover", { fill: am5.color(0x6794dc) });
    var heatLegend = mapChart.children.push(am5.HeatLegend.new(mapRoot, {
        orientation: "vertical",
        startColor: am5.color(0xfff7e6),
        endColor: am5.color(0xd9534f),
        startText: "0",
        endText: "1",
        stepCount: 5,
        y: am5.percent(50),
        centerY: am5.percent(50),
        x: am5.percent(95),
        centerX: am5.percent(100)
    }));
    polygonSeries.set("heatLegend", heatLegend);

    // --- COLUMN CHART SETUP ---
    var columnRoot = am5.Root.new("linechartdiv");
    columnRoot.setThemes([am5themes_Animated.new(columnRoot)]);
    var columnChart = columnRoot.container.children.push(am5xy.XYChart.new(columnRoot, { panX: true, panY: true, wheelX: "panX", wheelY: "zoomX", pinchZoomX: true }));
    var cursor = columnChart.set("cursor", am5xy.XYCursor.new(columnRoot, {}));
    cursor.lineY.set("visible", false);
    var xAxis = columnChart.xAxes.push(am5xy.DateAxis.new(columnRoot, { 
        maxDeviation: 0.2, 
        baseInterval: { timeUnit: "month", count: 1 }, 
        renderer: am5xy.AxisRendererX.new(columnRoot, {}), 
        tooltip: am5.Tooltip.new(columnRoot, {}),
        dateFormats: {
            day: "MM月dd日",
            month: "yyyy年MM月",
            year: "yyyy年"
        },
        periodChangeDateFormats: {
            day: "MM月dd日",
            month: "yyyy年MM月", 
            year: "yyyy年"
        }
    }));
    var yAxis = columnChart.yAxes.push(am5xy.ValueAxis.new(columnRoot, { 
        renderer: am5xy.AxisRendererY.new(columnRoot, {}), 
        numberFormat: "#",
        min: 0,
        strictMinMax: true
    }));
    var columnSeries = columnChart.series.push(am5xy.ColumnSeries.new(columnRoot, { name: "", xAxis: xAxis, yAxis: yAxis, valueYField: "value", valueXField: "date", tooltip: am5.Tooltip.new(columnRoot, { labelText: "{valueY}" }) }));
    columnSeries.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    columnChart.appear(1000, 100);

    // --- SLIDER SETUP ---
    function rebuildSlider(unit) {
        if (slider.noUiSlider) { slider.noUiSlider.destroy(); }
        const isMonth = unit === 'month';
        const rangeMax = isMonth ? uniqueMonths.length - 1 : uniqueYears.length - 1;
        const pipsValues = isMonth ? [0, 25, 50, 75, 100] : uniqueYears.map((y, i) => (i / (uniqueYears.length -1)) * 100).filter(v => v>=0 && v<=100);

        noUiSlider.create(slider, {
            start: [0, rangeMax],
            connect: true,
            step: 1,
            range: { 'min': 0, 'max': rangeMax },
            pips: { mode: 'positions', values: pipsValues, density: isMonth ? 2 : 1, format: { to: value => isMonth ? uniqueMonths[Math.round(value)] : uniqueYears[Math.round(value)] } }
        });
        slider.noUiSlider.on('update', updateDashboard);
        updateDashboard(slider.noUiSlider.get());
    }

    // --- Main Update Function ---
    function updateDashboard(values) {
        const isMonth = currentTimeUnit === 'month';
        const source = isMonth ? uniqueMonths : uniqueYears;
        const startIndex = parseInt(values[0]);
        const endIndex = parseInt(values[1]);
        const start = source[startIndex];
        const end = source[endIndex];

        const startLabel = isMonth ? start : `${start}年`;
        const endLabel = isMonth ? end : `${end}年`;
        sliderValuesDiv.innerHTML = start === end ? startLabel : `${startLabel} 〜 ${endLabel}`;
        tableTitle.innerHTML = `集計期間: ${sliderValuesDiv.innerHTML}`;
        lineChartTitle.innerHTML = isMonth ? '月次被害推移' : '年次被害推移';

        const filteredData = allData.filter(d => {
            const itemTime = isMonth ? `${d.year}-${String(d.month).padStart(2, '0')}` : d.year;
            return itemTime >= start && itemTime <= end;
        });

        const aggregatedData = filteredData.reduce((acc, item) => {
            if (!acc[item.id]) { acc[item.id] = { id: item.id, name: item.name, incidents: 0, victims: 0, deaths: 0 }; }
            acc[item.id].incidents += item.incidents; acc[item.id].victims += item.victims; acc[item.id].deaths += item.deaths;
            return acc;
        }, {});

        const fullAggregatedData = {};
        am5geodata_japanLow.features.forEach(feature => {
            const id = feature.id;
            let name = feature.properties.name_ja || feature.properties.name;
            
            // ローマ字の場合は漢字に変換
            if (prefectureNames[name]) {
                name = prefectureNames[name];
            }
            
            fullAggregatedData[id] = {
                id: id,
                name: name,
                incidents: 0,
                victims: 0,
                deaths: 0,
                ...aggregatedData[id]
            };
        });

        lastAggregatedData = Object.values(fullAggregatedData);
        
        const mapDataForChart = lastAggregatedData.map(item => ({ id: item.id, name: item.name, value: item[currentMetric] || 0 }));

        const mapValues = mapDataForChart.map(d => d.value).filter(v => v > 0);
        const minValue = 0;
        const maxValue = mapValues.length > 0 ? Math.max(...mapValues) : 1; // Avoid max of 0

        polygonSeries.set("heatRules", [{
            target: polygonSeries.mapPolygons.template,
            dataField: "value",
            min: am5.color(0xfff7e6),
            max: am5.color(0xd9534f),
            key: "fill",
            minValue: minValue,
            maxValue: maxValue
        }]);

        // 判例の値を動的に設定
        heatLegend.setAll({
            startValue: minValue,
            endValue: maxValue,
            startText: minValue.toString(),
            endText: maxValue.toString()
        });

        polygonSeries.data.setAll(mapDataForChart);

        xAxis.set("baseInterval", { timeUnit: currentTimeUnit, count: 1 });
        const aggregatedColumnData = filteredData.reduce((acc, item) => {
            const key = isMonth ? `${item.year}-${String(item.month).padStart(2, '0')}` : `${item.year}`;
            if (!acc[key]) { acc[key] = { date: new Date(isMonth ? key + '-01' : key).getTime(), incidents: 0, victims: 0, deaths: 0 }; }
            acc[key].incidents += item.incidents; acc[key].victims += item.victims; acc[key].deaths += item.deaths;
            return acc;
        }, {});
        const columnDataForChart = Object.values(aggregatedColumnData).map(item => ({ date: item.date, value: item[currentMetric] || 0 })).sort((a, b) => a.date - b.date);
        columnSeries.data.setAll(columnDataForChart);
        
        const currentMetricName = document.querySelector(`.metric-btn[data-metric='${currentMetric}']`).textContent;
        columnSeries.set("name", currentMetricName);
        const color = metricColors[currentMetric];
        columnSeries.columns.template.setAll({ fill: color, stroke: color });
        columnSeries.get("tooltip").get("background").set("fill", color);

        updateTable();
    }

    // --- Table Update & Sort ---
    function updateTable() {
        const data = lastAggregatedData;
        const { column, direction } = sortState;

        data.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];
            if (column === 'name') {
                return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            } else {
                return direction === 'asc' ? aVal - bVal : bVal - aVal;
            }
        });

        let tableHTML = '<table><thead><tr><th data-sortable="false">No.</th>';
        const headers = { name: '都道府県', incidents: '件数', victims: '被害者数', deaths: '死亡者数' };
        for (const key in headers) {
            let indicator = '';
            if (sortState.column === key) {
                indicator = sortState.direction === 'asc' ? ' ▲' : ' ▼';
            }
            tableHTML += `<th data-sortable="true" data-column="${key}">${headers[key]}<span class="sort-indicator">${indicator}</span></th>`;
        }
        tableHTML += '</tr></thead><tbody>';

        if (data.length > 0) {
            data.forEach((item, index) => {
                tableHTML += `<tr><td>${index + 1}</td><td>${item.name}</td><td>${item.incidents}</td><td>${item.victims}</td><td>${item.deaths}</td></tr>`;
            });
        } else { tableHTML += '<tr><td colspan="5">対象期間のデータはありません。</td></tr>'; }
        tableHTML += '</tbody></table>';
        tableDiv.innerHTML = tableHTML;
    }

    // --- Event Listeners ---
    metricButtons.forEach(button => {
        button.addEventListener('click', () => {
            metricButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentMetric = button.dataset.metric;
            sortState.column = currentMetric; // Also change sort column
            updateDashboard(slider.noUiSlider.get());
        });
    });


    timeUnitButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeUnitButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTimeUnit = button.dataset.unit;
            rebuildSlider(currentTimeUnit);
        });
    });

    tableDiv.addEventListener('click', (e) => {
        const header = e.target.closest('th[data-sortable="true"]');
        if (!header) return;

        const column = header.dataset.column;
        if (sortState.column === column) {
            sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
        } else {
            sortState.column = column;
            sortState.direction = 'desc';
        }
        updateTable();
    });

    // --- Initial Load ---
    rebuildSlider(currentTimeUnit);

});