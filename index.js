import { useState } from 'react';
import Head from 'next/head';

export default function FaraidCalculator() {
  const [estate, setEstate] = useState('');
  const [gender, setGender] = useState('male');
  const [hasSpouse, setHasSpouse] = useState(true);
  const [hasMother, setHasMother] = useState(true);
  const [hasFather, setHasFather] = useState(true);
  const [sons, setSons] = useState('0');
  const [daughters, setDaughters] = useState('0');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi input
    if (!estate || parseFloat(estate) <= 0) {
      setError('Harap masukkan nilai harta warisan yang valid');
      return;
    }
    
    if (!hasSpouse && !hasMother && !hasFather && sons === '0' && daughters === '0') {
      setError('Harap pilih setidaknya satu ahli waris');
      return;
    }
    
    setError('');
    const res = calculateShares(
      estate,
      gender,
      hasSpouse,
      hasMother,
      hasFather,
      sons,
      daughters
    );
    setResults(res);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Kalkulator Warisan Faraid - Perhitungan Waris Islam</title>
        <meta name="description" content="Kalkulator warisan berdasarkan hukum Islam (Faraid) sesuai Al-Qur'an dan Sunnah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Kalkulator Warisan Faraid</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hitung pembagian harta waris sesuai hukum Islam dengan akurat berdasarkan Al-Qur'an dan Sunnah
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nilai Harta Waris (Rp)
                </label>
                <input
                  type="number"
                  value={estate}
                  onChange={(e) => setEstate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: 100000000"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin Almarhum/Almarhumah
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="spouse"
                  checked={hasSpouse}
                  onChange={(e) => setHasSpouse(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="spouse" className="ml-2 text-gray-700">
                  {gender === 'male' ? 'Istri' : 'Suami'}
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mother"
                  checked={hasMother}
                  onChange={(e) => setHasMother(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="mother" className="ml-2 text-gray-700">Ibu</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="father"
                  checked={hasFather}
                  onChange={(e) => setHasFather(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="father" className="ml-2 text-gray-700">Ayah</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah Anak Laki-laki
                </label>
                <input
                  type="number"
                  min="0"
                  value={sons}
                  onChange={(e) => setSons(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah Anak Perempuan
                </label>
                <input
                  type="number"
                  min="0"
                  value={daughters}
                  onChange={(e) => setDaughters(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Hitung Warisan
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hasil Perhitungan Warisan</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ahli Waris</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bagian</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai (Rp)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.heir}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatFraction(result.share)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {formatCurrency(result.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(result.share * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Penjelasan Perhitungan:</h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>Perhitungan sesuai dengan hukum waris Islam (Faraid) berdasarkan Al-Qur'an Surah An-Nisa' ayat 11-12</li>
                <li>Bagian tetap (Ashhabul Faraidh) dihitung terlebih dahulu sesuai ketentuan syariah</li>
                <li>Sisa harta setelah pembagian bagian tetap dibagikan kepada ahli waris asabah (anak laki-laki)</li>
                <li>Jika jumlah bagian melebihi 1, dilakukan penyesuaian (awl) secara proporsional</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-12 bg-gray-100 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Panduan Penggunaan</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">1. Masukkan Nilai Harta Waris</h3>
              <p className="text-gray-600">Masukkan total nilai harta yang akan dibagikan setelah dikurangi hutang dan biaya pengurusan jenazah.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">2. Pilih Jenis Kelamin Almarhum/Almarhumah</h3>
              <p className="text-gray-600">Pemilihan jenis kelamin mempengaruhi bagian pasangan (suami/istri).</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">3. Tentukan Ahli Waris yang Ada</h3>
              <p className="text-gray-600">Pilih ahli waris yang berhak menerima harta waris sesuai dengan kondisi keluarga.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">4. Masukkan Jumlah Anak</h3>
              <p className="text-gray-600">Masukkan jumlah anak laki-laki dan perempuan yang masih hidup.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">5. Klik Hitung Warisan</h3>
              <p className="text-gray-600">Sistem akan menghitung pembagian harta waris sesuai ketentuan hukum Islam.</p>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Kalkulator Warisan Faraid. Dibuat dengan penuh kehati-hatian sesuai dengan hukum waris Islam.</p>
          <p className="mt-1">Aplikasi ini hanya sebagai panduan perhitungan. Untuk kasus yang kompleks, disarankan berkonsultasi dengan ahli waris terpercaya.</p>
        </footer>
      </main>
    </div>
  );
}

function calculateShares(estate, gender, hasSpouse, hasMother, hasFather, sons, daughters) {
  // Konversi input ke tipe data yang sesuai
  sons = parseInt(sons) || 0;
  daughters = parseInt(daughters) || 0;
  estate = parseFloat(estate) || 0;

  let spouseShare = 0;
  let motherShare = 0;
  let fatherShare = 0;
  let daughtersFixedShare = 0;

  // 1. Menghitung bagian pasangan
  if (hasSpouse) {
    if (gender === 'male') { // Almarhum laki-laki (istri)
      if (sons > 0 || daughters > 0) {
        spouseShare = 1/8;
      } else {
        spouseShare = 1/4;
      }
    } else { // Almarhumah perempuan (suami)
      if (sons > 0 || daughters > 0) {
        spouseShare = 1/4;
      } else {
        spouseShare = 1/2;
      }
    }
  }

  // 2. Menghitung bagian ibu
  if (hasMother) {
    if (sons > 0 || daughters > 0) {
      motherShare = 1/6;
    } else {
      motherShare = 1/3;
    }
  }

  // 3. Menghitung bagian ayah (bagian tetap jika ada anak)
  if (hasFather) {
    if (sons > 0 || daughters > 0) {
      fatherShare = 1/6;
    }
    // Jika tidak ada anak, ayah akan mendapat sisa (residu)
  }

  // 4. Menghitung bagian anak perempuan (jika tidak ada anak laki-laki)
  if (sons === 0 && daughters > 0) {
    if (daughters === 1) {
      daughtersFixedShare = 1/2;
    } else {
      daughtersFixedShare = 2/3;
    }
  }

  // 5. Jumlah bagian tetap
  let sumBase = spouseShare + motherShare + fatherShare + daughtersFixedShare;
  let residual = 0;
  let sonsShare = 0;
  let daughtersResidualShare = 0;

  // 6. Periksa apakah jumlah bagian melebihi 1 (perlu penyesuaian awl)
  if (sumBase > 1) {
    const factor = 1 / sumBase;
    spouseShare *= factor;
    motherShare *= factor;
    fatherShare *= factor;
    daughtersFixedShare *= factor;
  } else {
    residual = 1 - sumBase;
    if (residual > 0) {
      if (sons > 0) {
        // Distribusi sisa kepada anak laki-laki dan perempuan
        const totalParts = sons * 2 + daughters;
        const partValue = residual / totalParts;
        sonsShare = partValue * 2; // Anak laki-laki dapat 2x
        daughtersResidualShare = partValue;
      } else if (daughters > 0) {
        // Sisa diberikan kepada ayah jika ada anak perempuan tanpa anak laki-laki
        if (hasFather) {
          fatherShare += residual;
        }
      } else {
        // Tidak ada anak, sisa diberikan kepada ayah
        if (hasFather) {
          fatherShare += residual;
        }
      }
    }
  }

  // 7. Hitung nilai aktual
  const results = [];

  if (hasSpouse) {
    const amount = spouseShare * estate;
    results.push({ 
      heir: gender === 'male' ? 'Istri' : 'Suami', 
      share: spouseShare, 
      amount 
    });
  }

  if (hasMother) {
    const amount = motherShare * estate;
    results.push({ 
      heir: 'Ibu', 
      share: motherShare, 
      amount 
    });
  }

  if (hasFather) {
    const amount = fatherShare * estate;
    results.push({ 
      heir: 'Ayah', 
      share: fatherShare, 
      amount 
    });
  }

  if (daughters > 0) {
    if (sons === 0) {
      // Anak perempuan mendapat bagian tetap
      const sharePerDaughter = daughtersFixedShare / daughters;
      const amountPerDaughter = sharePerDaughter * estate;
      
      for (let i = 0; i < daughters; i++) {
        results.push({ 
          heir: `Anak Perempuan ${i + 1}`, 
          share: sharePerDaughter, 
          amount: amountPerDaughter 
        });
      }
    } else {
      // Anak perempuan mendapat bagian sisa
      const amountPerDaughter = daughtersResidualShare * estate;
      
      for (let i = 0; i < daughters; i++) {
        results.push({ 
          heir: `Anak Perempuan ${i + 1}`, 
          share: daughtersResidualShare, 
          amount: amountPerDaughter 
        });
      }
    }
  }

  if (sons > 0) {
    const amountPerSon = sonsShare * estate;
    
    for (let i = 0; i < sons; i++) {
      results.push({ 
        heir: `Anak Laki-laki ${i + 1}`, 
        share: sonsShare, 
        amount: amountPerSon 
      });
    }
  }

  return results;
}

// Fungsi bantu untuk format angka
function formatCurrency(amount) {
  return amount.toLocaleString('id-ID', { maximumFractionDigits: 0 });
}

// Fungsi bantu untuk format pecahan
function formatFraction(decimal) {
  if (decimal === 0) return '0';
  
  // Konversi desimal ke pecahan sederhana
  const fractions = [
    { value: 1/2, label: '1/2' },
    { value: 1/3, label: '1/3' },
    { value: 1/4, label: '1/4' },
    { value: 1/6, label: '1/6' },
    { value: 1/8, label: '1/8' },
    { value: 2/3, label: '2/3' }
  ];
  
  for (const frac of fractions) {
    if (Math.abs(decimal - frac.value) < 0.001) {
      return frac.label;
    }
  }
  
  // Jika tidak cocok dengan pecahan umum, tampilkan desimal
  return decimal.toFixed(4);
}
