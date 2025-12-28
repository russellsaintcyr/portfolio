// Quick script to check if metadata is being generated correctly
// Run: node scripts/check-metadata.js

const https = require('https');
const http = require('http');

const url = process.argv[2] || 'http://localhost:3000/top40/2025';

const protocol = url.startsWith('https') ? https : http;

protocol.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Check for Open Graph tags
    const ogTags = {
      'og:title': data.match(/<meta\s+property="og:title"\s+content="([^"]+)"/)?.[1],
      'og:description': data.match(/<meta\s+property="og:description"\s+content="([^"]+)"/)?.[1],
      'og:image': data.match(/<meta\s+property="og:image"\s+content="([^"]+)"/)?.[1],
      'og:url': data.match(/<meta\s+property="og:url"\s+content="([^"]+)"/)?.[1],
    };
    
    // Check for Twitter tags
    const twitterTags = {
      'twitter:card': data.match(/<meta\s+name="twitter:card"\s+content="([^"]+)"/)?.[1],
      'twitter:title': data.match(/<meta\s+name="twitter:title"\s+content="([^"]+)"/)?.[1],
      'twitter:description': data.match(/<meta\s+name="twitter:description"\s+content="([^"]+)"/)?.[1],
    };
    
    // Check for meta description
    const metaDescription = data.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1];
    
    console.log('\n📋 Metadata Check Results:\n');
    console.log('Meta Description:', metaDescription || '❌ Not found');
    console.log('\nOpen Graph Tags:');
    Object.entries(ogTags).forEach(([key, value]) => {
      console.log(`  ${key}:`, value || '❌ Not found');
    });
    console.log('\nTwitter Tags:');
    Object.entries(twitterTags).forEach(([key, value]) => {
      console.log(`  ${key}:`, value || '❌ Not found');
    });
    console.log('\n');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  console.log('\nMake sure your Next.js dev server is running on port 3000');
});

